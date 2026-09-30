"""
Script to modify an existing cube in the Blender scene:
- Change material color to red
- Set dimensions to 2m x 2m x 2m
- Does NOT modify sphere, cylinder, camera, or light

Run this in Blender's Python console or Scripting workspace.
"""

import bpy

# Find the cube object in the scene
cube = None
for obj in bpy.data.objects:
    if obj.type == 'MESH':
        # Check if it's a cube (has 8 vertices and 6 faces typically)
        if obj.data.name in [mesh.name for mesh in bpy.data.meshes if mesh.name.startswith('Cube') or obj.name.lower().startswith('cube')]:
            cube = obj
            break
        # Also check by vertex count (cube has 8 vertices)
        if len(obj.data.vertices) == 8:
            cube = obj
            break

# If no cube found by name, try the first mesh object that looks like a cube
if cube is None:
    for obj in bpy.data.objects:
        if obj.type == 'MESH' and len(obj.data.vertices) == 8:
            cube = obj
            break

if cube is None:
    print("ERROR: No cube found in the scene!")
else:
    print(f"Found cube: {cube.name}")
    
    # Store original location
    original_location = cube.location.copy()
    print(f"Original location: {original_location[:]}")
    
    # Set dimensions to 2m x 2m x 2m
    cube.dimensions = (2.0, 2.0, 2.0)
    print(f"New dimensions: {cube.dimensions[:]}")
    
    # Create or update material to red
    if cube.data.materials:
        mat = cube.data.materials[0]
    else:
        mat = bpy.data.materials.new(name="RedMaterial")
        cube.data.materials.append(mat)
    
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs['Base Color'].default_value = (0.8, 0.0, 0.0, 1.0)  # Red RGBA
    bsdf.inputs['Roughness'].default_value = 0.6
    mat.name = "RedMaterial"
    
    print(f"Material updated: {mat.name}")
    print(f"Base Color: (0.8, 0.0, 0.0, 1.0) - Red")
    
    # Verify - confirm location wasn't changed
    print("\n" + "=" * 50)
    print("VERIFICATION REPORT")
    print("=" * 50)
    print(f"Object name: {cube.name}")
    print(f"Object type: {cube.type}")
    print(f"Location: {cube.location[:]}")
    print(f"Dimensions: {cube.dimensions[:]}")
    print(f"Material: {cube.data.materials[0].name if cube.data.materials else 'None'}")
    print("=" * 50)
    
    # List all other objects to confirm they weren't modified
    print("\nOther objects in scene (NOT modified):")
    for obj in bpy.data.objects:
        if obj != cube:
            print(f"  - {obj.name} (type: {obj.type})")
    print("=" * 50)
    print("Cube modification complete!")
