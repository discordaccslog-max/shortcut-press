extends CharacterBody2D
## The player: runs left and right and jumps. Attach to a CharacterBody2D.

@export var speed := 220.0
@export var jump_velocity := -420.0

var gravity: float = ProjectSettings.get_setting("physics/2d/default_gravity")


func _physics_process(delta: float) -> void:
	# Fall when not standing on something.
	if not is_on_floor():
		velocity.y += gravity * delta

	# Jump only from the ground.
	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = jump_velocity

	# -1 for left, 1 for right, 0 for neither.
	var direction := Input.get_axis("move_left", "move_right")
	velocity.x = direction * speed

	move_and_slide()

	# Fell off the level: start again.
	if position.y > 1200:
		get_tree().reload_current_scene()
