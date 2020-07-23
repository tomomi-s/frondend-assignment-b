import React from 'react';
import { storiesOf } from "@storybook/react";
import SearchInput from './SearchInput';

//storiesOf("SearchInput", module).add("default", ()=>(<SearchInput />))

export default {
  component: SearchInput,
  title: 'SearchInput',
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => <SearchInput />
//export const withSearchValue  = () => <SearchInput defaultValue="trui"/>