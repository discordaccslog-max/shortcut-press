extends Node2D
## The level: counts coins and updates the score label.

var score := 0

@onready var score_label: Label = $HUD/ScoreLabel
@onready var pickup_sound: AudioStreamPlayer = $PickupSound


func _ready() -> void:
	for coin in get_tree().get_nodes_in_group("coins"):
		coin.collected.connect(_on_coin_collected)
	_update_label()


func _on_coin_collected() -> void:
	score += 1
	pickup_sound.play()
	_update_label()


func _update_label() -> void:
	score_label.text = "Coins: %d" % score
