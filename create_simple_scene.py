"""
Simple 3D Scene Creator for Blender
Creates: cube, floor plane, camera, and light
Run in Blender's Scripting workspace (Alt+P)
"""

import bpy

# Clear existing scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Remove default objects
for obj in bpy.data.objects:
    bpy.data.objects.remove(obj)

# Remove default meshes and materials
for mesh in bpy.data.meshes:
    bpy.data.meshes.remove(mesh)
for mat in bpy.data.materials:
    bpy.data.materials.remove(mat)

print("Scene cleared. Creating new objects...")

# ============================================================
# 1. FLOOR PLANE (10m x 10m, gray concrete)
# ============================================================
bpy.ops.mesh.primitive_plane_add(size=10, location=(0, 0, 0))
floor = bpy.context.active_object
floor.name = "Floor"

floor_mat = bpy.data.materials.new(name="FloorMaterial")
floor_mat.use_nodes = True
floor_bsdf = floor_mat.node_tree.nodes["Principled BSDF"]
floor_bsdf.inputs['Base Color'].default_value = (0.33, 0.33, 0.33, 1.0)  # Gray
floor_bsdf.inputs['Roughness'].default_value = 0.9
floor_bsdf.inputs['Metallic'].default_value = 0.0
floor.data.materials.append(floor_mat)

print(f"Created: {floor.name} - {floor.dimensions[:]} at {floor.location[:]}")

# ============================================================
# 2. RED CUBE (1m x 1m x 1m, sitting on floor)
# ============================================================
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0.5))
cube = bpy.context.active_object
cube.name = "Cube"

cube_mat = bpy.data.materials.new(name="CubeMaterial")
cube_mat.use_nodes = True
cube_bsdf = cube_mat.node_tree.nodes["Principled BSDF"]
cube_bsdf.inputs['Base Color'].default_value = (0.8, 0.0, 0.0, 1.0)  # Red
cube_bsdf.inputs['Roughness'].default_value = 0.6
cube_bsdf.inputs['Metallic'].default_value = 0.1
cube.data.materials.append(cube_mat)

print(f"Created: {cube.name} - {cube.dimensions[:]} at {cube.location[:]}")

# ============================================================
# 3. CAMERA (positioned to view the cube from above and to the side)
# ============================================================
cam_data = bpy.data.cameras.new(name="Camera")
cam_data.lens = 50  # 50mm focal length
cam_obj = bpy.data.objects.new("Camera", cam_data)
bpy.context.collection.objects.link(cam_obj)
cam_obj.location = (4, -4, 3)

# Point camera at the cube
constraint = cam_obj.constraints.new(type='TRACK_TO')
constraint.target = cube
constraint.track_axis = 'TRACK_NEGATIVE_Z'
constraint.up_axis = 'UP_Y'

bpy.context.scene.camera = cam_obj

print(f"Created: {cam_obj.name} at {cam_obj.location[:]}")

# ============================================================
# 4. SUN LIGHT (positioned above and to the side)
# ============================================================
light_data = bpy.data.lights.new(name="SunLight", type='SUN')
light_data.energy = 3.0
light_data.color = (1.0, 1.0, 1.0)
light_obj = bpy.data.objects.new("SunLight", light_data)
bpy.context.collection.objects.link(light_obj)
light_obj.location = (5, -5, 8)

# Point light at the cube
light_constraint = light_obj.constraints.new(type='TRACK_TO')
light_constraint.target = cube
light_constraint.track_axis = 'TRACK_NEGATIVE_Z'
light_constraint.up_axis = 'UP_Y'

print(f"Created: {light_obj.name} at {light_obj.location[:]}")

# ============================================================
# VERIFICATION
# ============================================================
print("\n" + "=" * 60)
print("SCENE CREATION VERIFICATION")
print("=" * 60)

objects_created = {
    "Cube": {"type": "MESH", "expected_dims": (1, 1, 1)},
    "Floor": {"type": "MESH", "expected_dims": (10, 10, 0.1)},
    "Camera": {"type": "CAMERA", "expected_dims": None},
    "SunLight": {"type": "LIGHT", "expected_dims": None},
}

all_passed = True
for obj_name, info in objects_created.items():
    obj = bpy.data.objects.get(obj_name)
    if obj is None:
        print(f"FAIL: {obj_name} not found!")
        all_passed = False
        continue
    
    print(f"\n--- {obj_name} ---")
    print(f"  Type: {obj.type} (expected: {info['type']})")
    print(f"  Location: {obj.location[:]}")
    
    if obj.type == 'MESH':
        print(f"  Dimensions: {obj.dimensions[:]}")
        print(f"  Materials: {[m.name for m in obj.data.materials]}")
    elif obj.type == 'CAMERA':
        print(f"  Lens: {obj.data.lens}mm")
    elif obj.type == 'LIGHT':
        print(f"  Light type: {obj.data.type}")
        print(f"  Energy: {obj.data.energy}")

print("\n" + "=" * 60)
print("OBJECTS IN SCENE:")
for obj in bpy.data.objects:
    print(f"  - {obj.name} (type: {obj.type})")
print("=" * 60)

if all_passed:
    print("\nSUCCESS: All objects created correctly!")
else:
    print("\nWARNING: Some objects may not have been created correctly.")
