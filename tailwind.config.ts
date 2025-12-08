import pandas as pd

def main():
    csv_path = "sample_data.csv"  # <--- Update if your filename is different
    
    print("Loading CSV...")
    df = pd.read_csv(csv_path, low_memory=False)
    print(f"Total Rows: {len(df)}\n")

    # ---------------------------------------------------------
    # STRATEGY: Serial + Timestamp + SeqNum
    # ---------------------------------------------------------
    target_cols = ['1stLevelSerial', 'CreatedOn', 'CreatTime', 'SeqNum']
    
    print(f"Checking combination: {target_cols} ...")
    
    # Check for duplicates using the pandas subset logic
    # keep=False ensures we count ALL rows involved in a duplicate set
    duplicates = df[df.duplicated(subset=target_cols, keep=False)]
    
    if duplicates.empty:
        print("\n✅ SUCCESS! This combination is UNIQUE.")
        print("You can use these 4 columns as your composite Primary Key.")
    else:
        print(f"\n❌ FAILED. Found {len(duplicates)} rows that are still duplicates.")
        
        # Sort them so you can easily compare the "matching" rows
        duplicates = duplicates.sort_values(by=target_cols)
        
        print("\n--- SAMPLE OF REMAINING DUPLICATES ---")
        print(duplicates[target_cols].head(10))
        
        # Export for manual review
        output_file = "failed_duplicates_seqnum.csv"
        duplicates.to_csv(output_file, index=True)
        print(f"\n📄 Detailed list saved to: {output_file}")
        print("Check this file. If these are still duplicates, look for a 'LineID' or 'TestStatus' column.")

if __name__ == "__main__":
    main()
