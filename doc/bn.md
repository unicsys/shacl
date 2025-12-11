import pandas as pd
import numpy as np
import random
import uuid

# Configuration
NUM_SAMPLES = 25000  # High volume to capture rare edge cases
random.seed(777)     # Lucky number for flight safety

# --- 1. DEFENSE-SPECIFIC INPUTS (TDP) ---

# Sub-sectors within Defense
PART_FAMILIES = [
    'Airframe_Structural',   # Ribs, Spars, Bulkheads
    'Propulsion_Hot_Section',# Turbine Blades, Nozzles
    'Missile_Guidance',      # Housings, Fins, Gimbals
    'Landing_Gear_System'    # Struts, Axles
]

# Aerospace Materials Specification (AMS)
MATERIALS = {
    'Airframe_Structural': ['Al_7050_T7451', 'Al_7075_T6', 'Ti_6Al4V_ELI', 'Composite_Carbon_Epoxy'],
    'Propulsion_Hot_Section':['Inconel_718', 'Inconel_625', 'Rene_41', 'Waspaloy', 'CMSX_4_Single_Crystal'],
    'Missile_Guidance':    ['Ti_6Al4V_Grade_5', 'Al_6061_T6', 'Maraging_Steel_250', 'Ceramic_Matrix_Comp'],
    'Landing_Gear_System': ['Steel_300M', 'AerMet_100', 'Ti_10V_2Fe_3Al', 'Stainless_15_5PH']
}

# Geometric Complexity Features
FEATURES = ['Standard_Profile', 'Deep_Pocketing', 'Internal_Cooling_Channels', 'Thin_Walled_Lattice', 'Complex_Airfoil', 'Precision_Bore']

# Criticality determines NDT (Non-Destructive Testing) and Process Freeze
CRITICALITY = ['Flight_Safety_Critical', 'Mission_Critical', 'Non_Critical']

# Tolerances (Inches for US Defense)
TOLERANCES = ['+/-0.030', '+/-0.005', '+/-0.001', '+/-0.0002'] 

# --- 2. THE EXPERT LOGIC ENGINE (A&D PROCESS ENGINEERING) ---

def get_defense_process(row):
    family = row['Part_Family']
    mat = row['Material_Spec']
    feat = row['Geometry_Feature']
    tol = row['Tolerance_Inches']
    crit = row['Criticality']
    dim_max = row['Max_Dim_Inches']

    # ================= 1. PROPULSION (Engines) =================
    if family == 'Propulsion_Hot_Section':
        # Sub-Branch: Superalloys + Internal Cooling (The "Impossible" Parts)
        if feat == 'Internal_Cooling_Channels':
            # Impossible to machine internal curves in superhard metal -> Additive
            return 'DMLS_Additive_Mfg', 'EOS_M400_4_Laser', 'HIP_Heat_Treat + Flow_Check'
        
        # Sub-Branch: Turbine Blades (Single Crystal)
        if mat == 'CMSX_4_Single_Crystal':
            return 'Investment_Casting_SX', 'Vacuum_Furnace_DS/SX', 'FPI_Inspection'
        
        # Sub-Branch: Hard Turning (Rings/Disks)
        if shape_is_round(feat):
            return 'Vertical_Turning_Lathe', 'Okuma_VTM-1200', 'Ultrasonic_Inspect'
        
        return '5_Axis_Mill_High_Torque', 'Liechti_GoMill', 'Deburr'

    # ================= 2. AIRFRAME (Structures) =================
    elif family == 'Airframe_Structural':
        # Sub-Branch: The "Monolithic" Parts (Big wings machined from solid block)
        if mat in ['Al_7050_T7451', 'Al_7075_T6']:
            if dim_max > 40: # Big parts
                if feat == 'Deep_Pocketing':
                    # Need high removal rate but low stress
                    return 'High_Speed_Gantry_Mill', 'Forest_Line_Aerostar', 'Shot_Peening'
            if feat == 'Thin_Walled_Lattice':
                return 'High_Speed_Machining', 'Makino_Mag3', 'Distortion_Check'
        
        # Sub-Branch: Titanium Structures
        if mat == 'Ti_6Al4V_ELI':
            return 'Heavy_Duty_Ti_Milling', 'Starrag_STC_800', 'Stress_Relief'

        # Sub-Branch: Composites
        if mat == 'Composite_Carbon_Epoxy':
            return 'AFP_Automated_Fiber_Placement', 'Electroimpact_AFP', 'Autoclave_Cure'

    # ================= 3. LANDING GEAR (High Strength) =================
    elif family == 'Landing_Gear_System':
        # 300M Steel is incredibly hard and used for landing gear pistons
        if mat == 'Steel_300M' or mat == 'AerMet_100':
            if tol == '+/-0.0002': # Pistons need perfect fit
                return 'Mill_Turn + ID/OD Grind', 'Mazak_Integrex_e670', 'Hard_Chrome_Plate'
            return 'Heavy_Turn_Mill', 'Okuma_Multus', 'Mag_Particle_Inspect'

    # ================= 4. MISSILE GUIDANCE (Precision/Lattice) =================
    elif family == 'Missile_Guidance':
        if feat == 'Thin_Walled_Lattice': # Light-weighting for range
            return 'EBM_Additive_Mfg', 'Arcam_Q20plus', 'Powder_Removal'
        
        if mat == 'Maraging_Steel_250': # Rocket motor cases
            return 'Flow_Forming', 'Leifeld_Flow_Former', 'Hydrotest'

        if tol == '+/-0.0002': # Gimbal bearings
            return 'Jig_Grinding', 'Moore_Tool_Grinder', 'CMM_Verify'

    # ================= FALLBACK (Standard Defense Work) =================
    if crit == 'Flight_Safety_Critical':
        return 'Certified_4_Axis_Mill', 'Haas_EC_400', '100_Percent_CMM'
    
    return 'Standard_3_Axis_Mill', 'Haas_VF_2', 'Sampling_Inspection'

def shape_is_round(feature):
    return feature in ['Precision_Bore', 'Standard_Profile'] # Simplification for logic

# --- 3. GENERATION LOOP ---

data = []

print("Generating Defense Manufacturing Data...")

for _ in range(NUM_SAMPLES):
    # Select Family
    fam = random.choices(PART_FAMILIES, weights=[0.4, 0.25, 0.2, 0.15])[0] # Airframe is most common
    
    # Select Material for that Family
    mat = random.choice(MATERIALS[fam])
    
    # Feature
    feat = random.choice(FEATURES)
    
    # Dimensions (Inches)
    dim = round(random.uniform(2.0, 120.0), 1)
    
    # Tolerance - heavily weighted towards tight in defense
    tol = random.choices(TOLERANCES, weights=[0.1, 0.3, 0.4, 0.2])[0]
    
    # Criticality
    crit = random.choices(CRITICALITY, weights=[0.3, 0.5, 0.2])[0]
    
    row = {
        'TDP_ID': f"CAGE-{random.randint(10000,99999)}-{str(uuid.uuid4())[:4]}",
        'Part_Family': fam,
        'Material_Spec': mat,
        'Geometry_Feature': feat,
        'Max_Dim_Inches': dim,
        'Tolerance_Inches': tol,
        'Criticality': crit
    }
    
    # Get Logic
    proc, mach, post = get_defense_process(row)
    
    row['Primary_Process'] = proc
    row['Machine_Resource'] = mach
    row['Special_Process_Req'] = post
    
    data.append(row)

# Save
df = pd.DataFrame(data)
filename = "defense_aerospace_data.csv"
df.to_csv(filename, index=False)

print(f"✅ Generated {NUM_SAMPLES} Defense TDP records.")
print(f"saved to {filename}")
print(df[['Part_Family', 'Material_Spec', 'Primary_Process']].head(10))
