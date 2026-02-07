
import { episodes as EPISODES_42ZHANGJING } from './content/programs/42zhangjing/episodes';
import { projects as PRODUCER_PROJECTS } from './content/producer/projects';
import { ladders as SP_LADDERS } from './content/side-projects/ladders';
import { cards as ID_CARDS } from './content/identity/cards';

// ============================================================================
// DATA AGGREGATOR
// Imports data from the 'content/' directory and exports it for the app.
// ============================================================================

export const IDENTITY_CARDS = ID_CARDS;
export const CREATOR_ITEMS = EPISODES_42ZHANGJING;
export const PRODUCER_ITEMS = PRODUCER_PROJECTS;
export const SIDE_PROJECT_LADDERS = SP_LADDERS;
