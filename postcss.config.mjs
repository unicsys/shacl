# --- Find all FOREIGN KEY constraints and format them for readability ---

# Step 1: Run the original query to get the raw data
fk_query = """
SELECT
    table_name,
    constraint_text
FROM
    duckdb_constraints
WHERE
    constraint_type = 'FOREIGN KEY'
ORDER BY
    table_name;
"""

print("--- Finding all Foreign Key constraints (explicitly defined relationships) ---")
foreign_key_df = analyzer.analyze(fk_query)

# Step 2: Process the raw DataFrame to create a clean visualization
if foreign_key_df is not None and not foreign_key_df.empty:
    
    processed_relationships = []
    
    # Loop through each row of the raw results
    for index, row in foreign_key_df.iterrows():
        source_table = row['table_name']
        constraint = row['constraint_text']
        
        # Split the constraint text into two halves at the word "REFERENCES"
        source_part, target_part = constraint.split(' REFERENCES ')
        
        # --- Clean up the source part ---
        # From: 'FOREIGN KEY (COL_A, COL_B)' -> To: 'COL_A, COL_B'
        source_columns = source_part.replace('FOREIGN KEY', '').strip().strip('()')
        
        # --- Clean up the target part ---
        # From: 'HAMR.TARGET_TABLE(COL_C, COL_D)'
        target_table_and_cols = target_part.split('(')
        target_table = target_table_and_cols[0].replace('HAMR.', '').strip()
        target_columns = target_table_and_cols[1].strip(')')
        
        # Store the clean data in a dictionary
        processed_relationships.append({
            'Source Table': source_table,
            'Source Columns': source_columns,
            'Target Table': target_table,
            'Target Columns': target_columns
        })

    # Create a new, clean DataFrame from our list of processed dictionaries
    clean_fk_df = pd.DataFrame(processed_relationships)
    
    print("\n--- Documented Table Relationships (Formatted View) ---")
    display(clean_fk_df)

else:
    print("\nNo FOREIGN KEY constraints were found in this DDL.")
