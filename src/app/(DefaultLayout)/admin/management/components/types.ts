export type MovieListProps = {
  data?: MovieValue[];
};

export type MovieValue = {
  titleKR?: string;
  titleEN?:string;
  rating?: string;
  release?: string;
  addDate?: string;
};
