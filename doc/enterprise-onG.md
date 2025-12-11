import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier, export_text, export_graphviz
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib

# 1. Load the Defense Data
df = pd.read_csv("defense_aerospace_data.csv")

print(f"Loaded Data: {df.shape}")

# 2. Preprocessing (Convert Words to Numbers)
# We need to save these Encoders to translate back later!
encoders = {}
feature_cols = ['Part_Family', 'Material_Spec', 'Geometry_Feature', 
                'Criticality', 'Tolerance_Inches']
target_col = 'Primary_Process'

# Encode Features (X)
df_encoded = df.copy()
for col in feature_cols:
    le = LabelEncoder()
    df_encoded[col] = le.fit_transform(df[col])
    encoders[col] = le

# Encode Target (Y)
le_target = LabelEncoder()
df_encoded[target_col] = le_target.fit_transform(df[target_col])
encoders['target'] = le_target

# Add numeric columns directly
X = df_encoded[feature_cols + ['Max_Dim_Inches']]
y = df_encoded[target_col]

# 3. Train the Decision Tree
# max_depth=7 allows complex rules (like Material + Tolerance + Criticality)
clf = DecisionTreeClassifier(max_depth=7, random_state=42) 
clf.fit(X, y)

print("✅ Model Trained successfully.")

# 4. Extract the Rules (The "Knowledge")
feature_names = list(X.columns)
rules_text = export_text(clf, feature_names=feature_names)

# Save the rules to a file (for the Knowledge Graph step)
with open("extracted_rules.txt", "w") as f:
    f.write(rules_text)

# 5. Visualizing a Specific "Reasoning Path"
# Let's decode a specific branch to verify it learned the "Physics"
print("\n--- SAMPLE LEARNED LOGIC (Decoded) ---")

# Let's verify if it learned the 'Internal Cooling -> DMLS' rule
# We manually query the tree logic
n_nodes = clf.tree_.node_count
children_left = clf.tree_.children_left
children_right = clf.tree_.children_right
feature = clf.tree_.feature
threshold = clf.tree_.threshold
values = clf.tree_.value

def recurse_and_print(node, depth, logic_chain):
    # Stop if too deep for demo
    if depth > 3: return 
    
    # If leaf node (Decision made)
    if children_left[node] == children_right[node]:
        class_idx = np.argmax(values[node])
        class_name = encoders['target'].inverse_transform([class_idx])[0]
        # Only print interesting cases
        if "DMLS" in class_name or "Investment" in class_name:
            print(f"PATH FOUND: {logic_chain} \n   -> DECISION: {class_name}")
        return

    # If internal node (Question asked)
    feat_name = feature_names[feature[node]]
    feat_idx = feature_cols.index(feat_name) if feat_name in feature_cols else -1
    
    # Check Left
    if feat_idx != -1:
        # Decode the threshold value for categorical data
        # (This is approximate for visualization)
        val_name = encoders[feat_name].inverse_transform([int(threshold[node])])[0]
        rule = f"{feat_name} <= {val_name}"
    else:
        rule = f"{feat_name} <= {threshold[node]:.2f}"
        
    recurse_and_print(children_left[node], depth+1, logic_chain + f" AND {rule}")
    recurse_and_print(children_right[node], depth+1, logic_chain + f" AND NOT({rule})")

# Run the decoder
recurse_and_print(0, 0, "IF")

# 6. Export for GraphViz (Optional visual tree)
export_graphviz(clf, out_file="tree_logic.dot", 
                feature_names=feature_names,
                class_names=encoders['target'].classes_,
                filled=True)

print("\n✅ Rules extracted to 'extracted_rules.txt'")
