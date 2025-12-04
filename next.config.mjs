import pandas as pd

# Load your new file
df = pd.read_csv("comprehensive_environment_data.csv")

# Print the first 5 rows
print(df.head())

# Check for any missing values
print("\nMissing values per column:")
print(df.isnull().sum())
