import pandas as pd
import itertools

def find_unique_ids(df):
    rows = len(df)
    print(f"Total Rows: {rows}")
    
    # 1. Check for Exact Duplicate Rows (The "Impossible" Scenario)
    # If the whole row is duplicated, no combination of columns will ever be unique.
    if df.duplicated().any():
        print("⚠️ WARNING: The dataset contains exact duplicate rows.")
        print("   -> It is impossible to find a unique key based on data content alone.")
        print("   -> Solution: Use the 'Fallback' method at the bottom of this script.\n")
        # Optional: Drop duplicates to continue the search
        # df = df.drop_duplicates() 
    
    found_keys = []
    columns = df.columns.tolist()

    print("--- Searching Single Columns ---")
    for col in columns:
        # subset checks uniqueness faster than string conversion
        if not df.duplicated(subset=[col]).any():
            print(f"✅ FOUND UNIQUE: ['{col}']")
            found_keys.append([col])

    if found_keys:
        return found_keys

    print("\n--- Searching 2-Column Combinations ---")
    # Get all combinations of 2 columns
    combos_2 = list(itertools.combinations(columns, 2))
    
    for i, combo in enumerate(combos_2):
        col_list = list(combo)
        # Progress indicator every 100 checks
        if i % 100 == 0:
            print(f"Checking combination {i}/{len(combos_2)}...", end='\r')
            
        if not df.duplicated(subset=col_list).any():
            print(f"✅ FOUND UNIQUE: {col_list}")
            found_keys.append(col_list)
            # Uncomment the next line if you want to stop at the first match
            # return found_keys 
            
    if found_keys:
        return found_keys

    print("\n--- Searching 3-Column Combinations ---")
    print("(This might take a while...)")
    combos_3 = list(itertools.combinations(columns, 3))
    
    for i, combo in enumerate(combos_3):
        col_list = list(combo)
        if i % 100 == 0:
            print(f"Checking combination {i}/{len(combos_3)}...", end='\r')

        if not df.duplicated(subset=col_list).any():
            print(f"✅ FOUND UNIQUE: {col_list}")
            found_keys.append(col_list)
            return found_keys # Returning early here because 3-col combos are huge
            
    return found_keys

def main():
    csv_path = "sample_data.csv" # <--- Update your file name
    print("Loading CSV...")
    df = pd.read_csv(csv_path, low_memory=False)
    
    # Run the finder
    results = find_unique_ids(df)
    
    if not results:
        print("\n❌ FAILED: No combination of 1, 2, or 3 columns makes a unique row ID.")
        print("You should generate a synthetic index.")
    else:
        print("\n🎉 Success! Use one of the combinations listed above.")

if __name__ == "__main__":
    main()
