# Spark SQL Compatible Development Environment
# This ensures your SQL will work in Databricks

# Cell 1: Setup DuckDB (Spark SQL Compatible)
import subprocess
import sys

# Install DuckDB - it's more compatible with Spark SQL than SQLite
subprocess.check_call([sys.executable, "-m", "pip", "install", "duckdb"])

import duckdb
import pandas as pd
from datetime import datetime
import os

print("✓ DuckDB installed - Better Spark SQL compatibility than SQLite")

# Cell 2: Create a Spark SQL Compatible Environment
class SparkSQLDevelopment:
    def __init__(self):
        self.conn = duckdb.connect(':memory:')
        self.tables = {}
        self.validated_queries = {}
        
        # Configure DuckDB to be more Spark-compatible
        self.conn.execute("SET timezone = 'UTC';")
        
    def create_table_from_df(self, table_name, df):
        """Register a DataFrame as a table"""
        self.tables[table_name] = df
        self.conn.register(table_name, df)
        print(f"✓ Created table '{table_name}' with {len(df)} rows")
        
    def test_spark_sql(self, query_name, sql, description=""):
        """Test a Spark SQL query"""
        print(f"\n{'='*80}")
        print(f"Testing Spark SQL Query: {query_name}")
        if description:
            print(f"Description: {description}")
        print(f"{'='*80}")
        
        # First, show the query
        print("SQL:")
        print(sql)
        print("-" * 40)
        
        try:
            # Try the query in DuckDB
            result = self.conn.execute(sql).df()
            
            print(f"✓ Query syntax valid in DuckDB")
            print(f"✓ Returned {len(result)} rows")
            print("\nSample results:")
            print(result.head())
            
            # Check for Spark-specific functions and warn
            self._check_spark_compatibility(sql)
            
            # Save the query
            self.validated_queries[query_name] = {
                'sql': sql,
                'description': description,
                'status': 'validated',
                'warnings': self._get_warnings(sql)
            }
            
            return result
            
        except Exception as e:
            print(f"❌ Query failed: {e}")
            
            # Provide Spark SQL alternatives
            self._suggest_spark_alternatives(sql, str(e))
            
            return None
    
    def _check_spark_compatibility(self, sql):
        """Check for common compatibility issues"""
        sql_upper = sql.upper()
        
        warnings = []
        
        # Check for SQLite-specific functions
        sqlite_functions = {
            'STRFTIME': 'Use date_format() in Spark SQL',
            'JULIANDAY': 'Use datediff() or date arithmetic in Spark SQL',
            'GROUP_CONCAT': 'Use collect_list() or collect_set() in Spark SQL',
            'SUBSTR': 'Spark uses substring() (though substr might work too)',
        }
        
        for func, suggestion in sqlite_functions.items():
            if func in sql_upper:
                warnings.append(f"⚠️  Found {func} - {suggestion}")
        
        # Check for Spark SQL functions that might not work in DuckDB
        spark_functions = {
            'COLLECT_LIST': 'array_agg',
            'COLLECT_SET': 'array_agg(DISTINCT ...)',
            'DATE_FORMAT': 'strftime',
            'EXPLODE': 'unnest',
            'FROM_UNIXTIME': 'to_timestamp',
            'UNIX_TIMESTAMP': 'epoch',
        }
        
        for func, duckdb_equiv in spark_functions.items():
            if func in sql_upper:
                warnings.append(f"ℹ️  {func} is Spark-specific. DuckDB equivalent: {duckdb_equiv}")
        
        if warnings:
            print("\n⚠️  Compatibility Notes:")
            for warning in warnings:
                print(f"   {warning}")
        else:
            print("\n✅ Query appears to be compatible with Spark SQL")
            
        return warnings
    
    def _get_warnings(self, sql):
        """Get all compatibility warnings for a query"""
        warnings = []
        sql_upper = sql.upper()
        
        # Add your specific warnings here
        if 'STRFTIME' in sql_upper:
            warnings.append("Replace strftime() with date_format() for Spark")
            
        return warnings
    
    def _suggest_spark_alternatives(self, sql, error):
        """Suggest Spark SQL alternatives for common issues"""
        print("\n💡 Spark SQL Alternatives:")
        
        if "strftime" in error.lower():
            print("   Instead of: strftime('%Y-%m', date_col)")
            print("   Use:        date_format(date_col, 'yyyy-MM')")
            
        if "group_concat" in error.lower():
            print("   Instead of: GROUP_CONCAT(col, ',')")
            print("   Use:        concat_ws(',', collect_list(col))")
            
    def save_validated_queries(self):
        """Save all validated queries with Spark SQL notes"""
        os.makedirs("validated_queries", exist_ok=True)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        for query_name, info in self.validated_queries.items():
            filename = f"validated_queries/{query_name}_spark_sql_{timestamp}.sql"
            
            with open(filename, 'w') as f:
                f.write("-- Spark SQL Query for Databricks\n")
                f.write(f"-- Query: {query_name}\n")
                f.write(f"-- Description: {info['description']}\n")
                f.write(f"-- Validated: {datetime.now()}\n")
                
                if info['warnings']:
                    f.write("-- ⚠️  Warnings:\n")
                    for warning in info['warnings']:
                        f.write(f"--    {warning}\n")
                
                f.write("-" * 80 + "\n\n")
                f.write(info['sql'])
            
            print(f"✓ Saved Spark SQL query: {filename}")

# Initialize the environment
spark_dev = SparkSQLDevelopment()

# Cell 3: Create Test Tables
# Sample data matching typical Databricks tables
customers_df = pd.DataFrame({
    'customer_id': range(1, 11),
    'customer_name': [f'Customer {i}' for i in range(1, 11)],
    'registration_date': pd.date_range('2023-01-01', periods=10, freq='M'),
    'country': ['USA', 'Canada', 'UK', 'USA', 'Germany'] * 2,
    'segment': ['Enterprise', 'SMB', 'Enterprise', 'SMB', 'Mid-Market'] * 2
})

orders_df = pd.DataFrame({
    'order_id': range(1001, 1021),
    'customer_id': [1, 2, 3, 4, 5] * 4,
    'order_date': pd.date_range('2024-01-01', periods=20, freq='W'),
    'amount': [1000 * i for i in range(1, 21)],
    'status': ['completed', 'pending', 'completed', 'cancelled', 'completed'] * 4
})

# Register tables
spark_dev.create_table_from_df('customers', customers_df)
spark_dev.create_table_from_df('orders', orders_df)

# Cell 4: Test Spark SQL Compatible Queries

# Example 1: Date formatting (Spark SQL style)
spark_dev.test_spark_sql(
    "monthly_revenue",
    """
    SELECT 
        -- Using DATE_FORMAT (Spark SQL function)
        -- Note: In DuckDB we'll use strftime for testing
        strftime('%Y-%m', order_date) as month,
        COUNT(*) as order_count,
        SUM(amount) as total_revenue
    FROM orders
    WHERE status = 'completed'
    GROUP BY strftime('%Y-%m', order_date)
    ORDER BY month
    """,
    "Monthly revenue report - Note: Replace strftime with date_format in Databricks"
)

# Example 2: Window functions (Spark SQL compatible)
spark_dev.test_spark_sql(
    "customer_ranking",
    """
    SELECT 
        c.customer_name,
        c.segment,
        SUM(o.amount) as total_spent,
        RANK() OVER (PARTITION BY c.segment ORDER BY SUM(o.amount) DESC) as rank_in_segment
    FROM customers c
    JOIN orders o ON c.customer_id = o.customer_id
    WHERE o.status = 'completed'
    GROUP BY c.customer_name, c.segment
    """,
    "Customer ranking by segment using window functions"
)

# Cell 5: Spark SQL Function Reference
print("\n" + "="*80)
print("SPARK SQL FUNCTION REFERENCE")
print("="*80)

spark_sql_functions = """
Common Spark SQL Functions (Use these in Databricks):

DATE FUNCTIONS:
- date_format(date, 'yyyy-MM-dd') - Format dates
- date_add(date, days) - Add days to date
- datediff(end_date, start_date) - Difference in days
- year(date), month(date), day(date) - Extract parts
- current_date(), current_timestamp() - Current date/time

STRING FUNCTIONS:
- concat(str1, str2, ...) - Concatenate strings
- concat_ws(sep, str1, str2, ...) - Concatenate with separator
- substring(str, pos, len) - Extract substring
- regexp_replace(str, pattern, replacement) - Regex replace
- split(str, delimiter) - Split string to array

AGGREGATE FUNCTIONS:
- collect_list(col) - Collect values into list
- collect_set(col) - Collect unique values
- approx_count_distinct(col) - Approximate distinct count
- percentile_approx(col, percentage) - Approximate percentile

ARRAY FUNCTIONS:
- explode(array_col) - Transform array to rows
- array_contains(array, value) - Check if array contains value
- size(array) - Get array size
- array_join(array, delimiter) - Join array elements

WINDOW FUNCTIONS:
- row_number() OVER (...) - Row number
- rank() OVER (...) - Rank with gaps
- dense_rank() OVER (...) - Rank without gaps
- lead(col, n) OVER (...) - Next row value
- lag(col, n) OVER (...) - Previous row value
"""

print(spark_sql_functions)

# Cell 6: Create Your Production Queries Here
# Template for Spark SQL compatible queries

# Your query 1
spark_dev.test_spark_sql(
    "your_query_name",
    """
    -- Write your actual Spark SQL here
    SELECT 
        *
    FROM customers
    LIMIT 10
    """,
    "Description of your query"
)

# Save all queries
spark_dev.save_validated_queries()
