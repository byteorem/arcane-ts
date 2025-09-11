# arcane-ts

TypeScript library for the Blizzard's World of Warcraft API, providing character data.

## Installation

```bash
npm install arcane-ts
```

## Usage

```typescript
import { ArcaneClient } from 'arcane-ts';

const client = new ArcaneClient({
	BLIZZARD_CLIENT_ID: 'your-client-id',
	BLIZZARD_CLIENT_SECRET: 'your-client-secret',
	region: 'us' // Optional: 'us', 'eu', 'kr', 'tw' (defaults to 'us')
});

// Get character equipment
const equipment = await client.getCharacterEquipment('charactername', 'realmname');
console.log(equipment);
```

## Configuration

The client requires Blizzard API credentials which can be obtained from the [Blizzard Developer Portal](https://develop.battle.net/).

## License

MIT
