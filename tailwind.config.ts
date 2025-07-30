# --- Find all PRIMARY KEY constraints and format them for readability ---

# Step 1: Run the original query to get the raw data
pk_query = """
SELECT
    table_name,
    constraint_text
FROM
    duckdb_constraints
WHERE
    constraint_type = 'PRIMARY KEY'
ORDER BY
    table_name;
"""

print("--- Finding all Primary Key constraints ---")
primary_key_df = analyzer.analyze(pk_query)

# Step 2: Process the raw DataFrame to create a clean visualization
if primary_key_df is not None and not primary_key_df.empty:
    
    # Create a copy of the DataFrame to modify, which is good practice
    clean_pk_df = primary_key_df.copy()
    
    # --- This is the key transformation ---
    # We apply a function to the 'constraint_text' column to clean it up.
    # It removes the 'PRIMARY KEY' text, strips whitespace, and removes parentheses.
    clean_pk_df['Key Columns'] = clean_pk_df['constraint_text'].str.replace('PRIMARY KEY', '', case=False).str.strip().str.strip('()')
    
    # We can now drop the original messy column
    clean_pk_df = clean_pk_df.drop(columns=['constraint_text'])
    
    # Rename 'table_name' for better readability
    clean_pk_df = clean_pk_df.rename(columns={'table_name': 'Table Name'})
    
    print("\n--- Official Table Unique Identifiers (Formatted View) ---")
    display(clean_pk_df[['Table Name', 'Key Columns']])

else:
    print("\nNo PRIMARY KEY constraints were found in this DDL.")
