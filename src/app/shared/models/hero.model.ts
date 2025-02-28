export interface Hero {
  id: number;
  name: string;
  power: string;
}

export enum HeroPower {
  FLY = 'Fly',
  INVISIBILITY = 'Invisibility',
  SUPER_STRENGTH = 'Super strength',
  TELEKINESIS = 'Telekinesis',
}
