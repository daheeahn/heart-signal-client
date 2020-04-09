enum GENDER {
  FEMALE,
  MALE,
}

export interface Lover {
  id: string;
  name: string;
  gender: GENDER;
  season: number;
  image: string;
  description: string;
  age: number;
  job: string;
}
