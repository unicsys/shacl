import openmeteo_requests
import requests
import pandas as pd
import urllib3
import urllib.request # <--- Needed to find system proxy settings

# --- CONFIGURATION ---
LOCATION_NAME = "Los Angeles"
LATITUDE = 34.0549
LONGITUDE = -118.2426
START_DATE = "2023-01-01"
END_DATE = "2023-01-31"

# --- SETUP API CLIENT ---

# 1. Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# 2. Setup Session
session = requests.Session()

# 3. AUTO-DETECT PROXIES (The Fix)
# This asks Windows: "What proxy is Chrome/Edge using?"
try:
    system_proxies = urllib.request.getproxies()
    if system_proxies:
        print(f"System proxies detected: {system_proxies}")
        session.proxies.update(system_proxies)
    else:
        print("No system proxies detected. Attempting direct connection.")
except Exception as e:
    print(f"Could not detect proxies: {e}")

# 4. Pretend to be a Browser and Disable SSL Verify
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
})
session.verify = False

# 5. Initialize OpenMeteo Client
openmeteo = openmeteo_requests.Client(session=session)

def get_maximal_weather(lat, lon, start, end):
    url = "https://archive-api.open-meteo.com/v1/archive"
    
    hourly_vars = [
        "temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature",
        "precipitation", "rain", "snowfall", "snow_depth", "weather_code",
        "pressure_msl", "surface_pressure", "cloud_cover", "cloud_cover_low",
        "et0_fao_evapotranspiration", "vapor_pressure_deficit", "wind_speed_10m",
        "wind_direction_10m", "wind_gusts_10m", "soil_temperature_0_to_7cm",
        "soil_moisture_0_to_7cm", "shortwave_radiation", "direct_radiation",
        "diffuse_radiation", "direct_normal_irradiance"
    ]

    params = {
        "latitude": lat,
        "longitude": lon,
        "start_date": start,
        "end_date": end,
        "hourly": hourly_vars,
        "timezone": "auto"
    }
    
    print(f"Requesting weather data for {lat}, {lon}...")
    
    # Process the request
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

    for i, var_name in enumerate(hourly_vars):
        data_dict[var_name] = hourly.Variables(i).ValuesAsNumpy()

    weather_df = pd.DataFrame(data=data_dict)
    return weather_df

# --- EXECUTION ---
try:
    df = get_maximal_weather(LATITUDE, LONGITUDE, START_DATE, END_DATE)
    
    filename = "comprehensive_environment_data.csv"
    df.to_csv(filename, index=False)
    print(f"\nSUCCESS: Saved {len(df)} rows to '{filename}'.")
    
except Exception as e:
    print("\n--- ERROR DETAIL ---")
    print(e)
