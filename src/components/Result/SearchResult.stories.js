import React from 'react';
import { storiesOf } from "@storybook/react";
import SearchResult from './SearchResult';

export default {
  component: SearchResult,
  title: 'SearchResult',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const defaultData = [
       {
          "searchterm":"heren truien",
          "nrResults":1100
       },
       {
          "searchterm":"dames truien",
          "nrResults":1501
       },
       {
          "searchterm":"kenzo trui",
          "nrResults":62
       },
       {
          "searchterm":"kenzo trui dames",
          "nrResults":21
       },
       {
          "searchterm":"kenzo trui heren",
          "nrResults":12
       },
       {
          "searchterm":"armani truien",
          "nrResults":39
       },
       {
          "searchterm":"daily paper trui",
          "nrResults":2
       },
       {
          "searchterm":"calvin klein trui",
          "nrResults":54
       },
       {
          "searchterm":"calvin klein trui heren rood",
          "nrResults":40
       },
       {
          "searchterm":"calvin klein trui heren blauw",
          "nrResults":50
       },
       {
          "searchterm":"calvin klein trui heren oranje",
          "nrResults":42
       }
];



export const Default = () => <SearchResult results={defaultData} searchValue="trui" />;

export const NoResult = () => <SearchResult results={[]} searchValue="abc" />;