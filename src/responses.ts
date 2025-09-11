interface ApiLink {
	href: string;
}

interface Links {
	self: ApiLink;
}

interface KeyedReference {
	key: ApiLink;
	name: string;
	id: number;
}

interface Realm extends KeyedReference {
	slug: string;
}

interface Character {
	key: ApiLink;
	name: string;
	id: number;
	realm: Realm;
}

interface ItemReference {
	key: ApiLink;
	id: number;
}

interface Slot {
	type: string;
	name: string;
}

interface Quality {
	type: string;
	name: string;
}

interface Media {
	key: ApiLink;
	id: number;
}

interface ItemClass {
	key: ApiLink;
	name: string;
	id: number;
}

interface ItemSubclass {
	key: ApiLink;
	name: string;
	id: number;
}

interface InventoryType {
	type: string;
	name: string;
}

interface Binding {
	type: string;
	name: string;
}

interface DisplayColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

interface ArmorDisplay {
	display_string: string;
	color: DisplayColor;
}

interface Armor {
	value: number;
	display: ArmorDisplay;
}

interface StatType {
	type: string;
	name: string;
}

interface StatDisplay {
	display_string: string;
	color: DisplayColor;
}

interface Stat {
	type: StatType;
	value: number;
	is_equip_bonus?: boolean;
	is_negated?: boolean;
	display: StatDisplay;
}

interface SellPrice {
	value: number;
	display_strings: {
		header: string;
		gold: string;
		silver: string;
		copper: string;
	};
}

interface PlayableClass {
	key: ApiLink;
	name: string;
	id: number;
}

interface PlayableRace {
	key: ApiLink;
	name: string;
	id: number;
}

interface LevelRequirement {
	value: number;
	display_string: string;
}

interface ClassRequirement {
	links: PlayableClass[];
	display_string: string;
}

interface RaceRequirement {
	links: PlayableRace[];
	display_string: string;
}

interface Requirements {
	level?: LevelRequirement;
	playable_classes?: ClassRequirement;
	playable_races?: RaceRequirement;
}

interface ItemLevel {
	value: number;
	display_string: string;
}

interface ItemSetReference {
	key: ApiLink;
	name: string;
	id: number;
}

interface SetItem {
	item: ItemReference & { name: string };
	is_equipped?: boolean;
}

interface SetEffect {
	display_string: string;
	required_count: number;
	is_active?: boolean;
}

interface ItemSet {
	item_set: ItemSetReference;
	items: SetItem[];
	effects: SetEffect[];
	display_string: string;
}

interface TransmogItem {
	key: ApiLink;
	name: string;
	id: number;
}

interface Transmog {
	item: TransmogItem;
	display_string: string;
	item_modified_appearance_id: number;
}

interface Durability {
	value: number;
	display_string: string;
}

interface NameDescription {
	display_string: string;
	color: DisplayColor;
}

interface Enchantment {
	display_string: string;
	source_item?: TransmogItem;
	enchantment_id: number;
	enchantment_slot: {
		id: number;
		type: string;
	};
}

interface SocketType {
	type: string;
	name: string;
}

interface SocketedItem {
	key: ApiLink;
	name: string;
	id: number;
}

interface Socket {
	socket_type: SocketType;
	item?: SocketedItem;
	context?: number;
	display_string?: string;
	media?: Media;
}

interface SpellReference {
	key: ApiLink;
	name: string;
	id: number;
}

interface Spell {
	spell: SpellReference;
	description: string;
	display_color?: DisplayColor;
}

interface DamageClass {
	type: string;
	name: string;
}

interface WeaponDamage {
	min_value: number;
	max_value: number;
	display_string: string;
	damage_class: DamageClass;
}

interface AttackSpeed {
	value: number;
	display_string: string;
}

interface DPS {
	value: number;
	display_string: string;
}

interface Weapon {
	damage: WeaponDamage;
	attack_speed: AttackSpeed;
	dps: DPS;
}

interface CraftingStat {
	id: number;
	type: string;
	name: string;
}

interface EquippedItem {
	item: ItemReference;
	enchantments?: Enchantment[];
	sockets?: Socket[];
	slot: Slot;
	quantity: number;
	context: number;
	bonus_list: number[];
	quality: Quality;
	name: string;
	modified_appearance_id?: number;
	media: Media;
	item_class: ItemClass;
	item_subclass: ItemSubclass;
	inventory_type: InventoryType;
	binding: Binding;
	unique_equipped?: string;
	limit_category?: string;
	armor?: Armor;
	weapon?: Weapon;
	stats: Stat[];
	spells?: Spell[];
	sell_price?: SellPrice;
	requirements?: Requirements;
	set?: ItemSet;
	level: ItemLevel;
	transmog?: Transmog;
	durability?: Durability;
	is_subclass_hidden?: boolean;
	name_description?: NameDescription;
	description?: string;
	modified_crafting_stat?: CraftingStat[];
}

interface EquippedItemSet {
	item_set: ItemSetReference;
	items: SetItem[];
	effects: SetEffect[];
	display_string: string;
}

export interface CharacterEquipmentResponse {
	_links: Links;
	character: Character;
	equipped_items: EquippedItem[];
	equipped_item_sets: EquippedItemSet[];
}
