import openmeteo_requests
import requests_cache
import pandas as pd
from retry_requests import retry
from geopy.geocoders import Nominatim

# --- CONFIGURATION ---
LOCATION_NAME = "Los Angeles"
START_DATE = "2023-01-01"
END_DATE = "2023-01-31"

# Setup API Client
cache_session = requests_cache.CachedSession('.cache', expire_after = -1)
retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
openmeteo = openmeteo_requests.Client(session = retry_session)

def get_coordinates(place_name):
    geolocator = Nominatim(user_agent="aircraft_env_fetcher_max")
    location = geolocator.geocode(place_name)
    if location:
        print(f"Found: {location.address} ({location.latitude}, {location.longitude})")
        return location.latitude, location.longitude
    else:
        raise ValueError(f"Could not find location: {place_name}")

def get_maximal_weather(lat, lon, start, end):
    url = "https://archive-api.open-meteo.com/v1/archive"
    
    # LIST OF ALL RELEVANT VARIABLES
    # This covers: Air, Ground, Water, Sun, Wind, Pressure
    hourly_vars = [
        "temperature_2m",           # Air Temp
        "relative_humidity_2m",     # Moisture %
        "dew_point_2m",             # Condensation Temp (Critical for Corrosion)
        "apparent_temperature",     # Feels like
        "precipitation",            # Total Water Falling
        "rain",                     # Liquid Water
        "snowfall",                 # Solid Water
        "snow_depth",               # Accumulated Snow
        "weather_code",             # WMO Code (0=Clear, 61=Rain, etc.)
        "pressure_msl",             # Pressure at Sea Level
        "surface_pressure",         # Pressure at Location Height
        "cloud_cover",              # Total Cloud %
        "cloud_cover_low",          # Low Clouds (Fog risk)
        "et0_fao_evapotranspiration", # How fast water evaporates (Drying rate)
        "vapor_pressure_deficit",   # Moisture demand of air (High = Dry, Low = Humid/Corrosive)
        "wind_speed_10m",           # Wind Speed
        "wind_direction_10m",       # Wind Direction
        "wind_gusts_10m",           # Max Gust
        "soil_temperature_0_to_7cm",# Ground Temp (affects storage floor temp)
        "soil_moisture_0_to_7cm",   # Ground Wetness (rising damp)
        "shortwave_radiation",      # Total Solar Energy
        "direct_radiation",         # Direct Sun (Heat load on surfaces)
        "diffuse_radiation",        # Ambient Light
        "direct_normal_irradiance"  # Sun intensity perpendicular to rays
    ]

    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": start,
        "end_date": end,
        "hourly": hourly_vars,
        "timezone": "auto"
    }
    
    print(f"Requesting {len(hourly_vars)} environmental variables...")
    responses = openmeteo.weather_api(url, params=params)
    response = responses[0]

    # Process Data
    hourly = response.Hourly()
    
    # Create the time index
    data_dict = {"date_time": pd.date_range(
        start=pd.to_datetime(hourly.Time(), unit="s", origin="unix"),
        end=pd.to_datetime(hourly.TimeEnd(), unit="s", origin="unix"),
        freq=pd.Timedelta(seconds=hourly.Interval()),
        inclusive="left"
    )}

    # Dynamically map API response to the variable names
    for i, var_name in enumerate(hourly_vars):
        data_dict[var_name] = hourly.Variables(i).ValuesAsNumpy()

    weather_df = pd.DataFrame(data=data_dict)
    return weather_df

# --- EXECUTION ---
lat, lon = get_coordinates(LOCATION_NAME)
df = get_maximal_weather(lat, lon, START_DATE, END_DATE)

# Save
filename = "comprehensive_environment_data.csv"
df.to_csv(filename, index=False)
print(f"\nSaved {len(df)} rows with {len(df.columns)} columns to '{filename}'.")
print("\nColumns retrieved:")
print(list(df.columns))
