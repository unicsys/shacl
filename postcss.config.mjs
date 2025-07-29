
Step 2: Open Your Project and Notebook

After restarting, open VS Code.

Open your Jupyter Notebook (.ipynb) file.

Step 3: Run the Cells to Create a Real Delta Table

We will now run the code that was failing before.

Run the Spark Session Cell (with Delta Support):

Find the cell that starts your Spark Session with the Delta Lake packages included. It should look like this. Run it (Shift + Enter).

Generated python
#
# CELL 1: Start Spark with Delta Lake support
#
from pyspark.sql import SparkSession

# The version of Delta Lake must be compatible with your Spark version.
delta_package = "io.delta:delta-spark_2.12:3.2.0" # Good for Spark 3.5.x

spark = SparkSession.builder \
    .appName("LocalDeltaTest") \
    .config("spark.jars.packages", delta_package) \
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog") \
    .getOrCreate()

print("✅ Spark Session created successfully with Delta Lake support!")


Run the CREATE TABLE Cell (The Real Test):

Now, go to the cell that was previously giving you the UnsatisfiedLinkError. Run it (Shift + Enter).

Generated python
#
# CELL 2: Create a real Delta table on your local disk
#
spark.sql("""
    CREATE OR REPLACE TABLE simple_parts (
        id INT,
        part_name STRING,
        category STRING
    )
    USING DELTA
""")

print("✅✅✅ SUCCESS: 'simple_parts' Delta table created on disk.")
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Python
IGNORE_WHEN_COPYING_END

What to Expect: This command should now complete successfully without any errors. If you look in your project folder in the VS Code explorer, you will see a new folder named spark-warehouse. Inside that, there will be another folder named simple_parts containing the files for your new Delta table.

What to Do Next

Now that your local environment is fully functional, you can proceed with the complete workflow.

Insert Data: Use INSERT INTO commands to populate your new simple_parts table.

Generated python
# In a new cell:
spark.sql("""
    INSERT INTO simple_parts VALUES
    (1, 'Spark Plug', 'Engine'),
    (2, 'Oil Filter', 'Engine'),
    (3, 'Wiper Blade', 'Exterior')
""")
print("Data inserted!")
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Python
IGNORE_WHEN_COPYING_END

Query the Table: Use SELECT statements to develop and test your queries.

Generated python
# In a new cell:
my_query = "SELECT * FROM simple_parts WHERE category = 'Engine'"
engine_parts_df = spark.sql(my_query)
engine_parts_df.show()
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Python
IGNORE_WHEN_COPYING_END

You are now fully equipped to build and test any queries you need before sending them to your colleague.
