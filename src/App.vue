<template>
  <vue3ExtendCalendar
    :data="propData"
    :totalData="propTotalData"
    :columns="propColumns"
    :total="true"
    :dateScope="['2023-01', '2023-10']"
    darkMode
    @getCellData="getCellData"
    @getChangedDate="getChangedDate"
  >
    <template #headerCell="{ data }"></template>
    <template #dateCellTitle="{ data }"></template>
    <template #dateCellContent="{ data }"> </template>
    <template #weekCellTitle="{ data }"> </template>
    <template #weekCellContent="{ data }"> </template>
    <template #monthCellTitle="{ data }"> </template>
    <template #monthCellContent="{ data }"> </template>
    <template #nullCellTitle="{ data }"> </template>
    <template #nullCellContent="{ data }"> </template>
  </vue3ExtendCalendar>
</template>

<script setup lang="ts">
import vue3ExtendCalendar from '../lib/vue3-extend-calendar.vue';

import { ref } from 'vue';

const propTotalData = [
  { data: '1', duration: '2023-02-01~2023-02-04' },
  { data: '2', duration: '2023-02-05~2023-02-11' },
  { data: '3', duration: '2023-02-05~2023-02-11' },
  { data: '4', duration: '2023-02-05~2023-02-11' },
  { data: '5', duration: '2023-02-05~2023-02-11' },
  { data: '월합계', duration: '2023-02-05~2023-02-11' },
];
const propColumns = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Total'];
const propData: any = ref([
  {
    date: '2023-02-01',
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    date: '2023-02-08',
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.77142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
  {
    coin_Cd: 3,
    coin_Amount: '816.97086746',
    coin_Fee: '139.5068553',
    coin_Actual: '836.96536296',
    currency_Amount: '1043596.55',
    currency_Fee: '178205.71',
    currency_Actual: '1069137.46',
  },
  {
    coin_Cd: 6,
    coin_Amount: '61.7asdasdasd7142177',
    coin_Fee: '15.44285544',
    coin_Actual: '77.2142772',
    currency_Amount: '4384',
    currency_Fee: '1096',
    currency_Actual: '5480',
  },
]);

const test = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(propData.value);
    }, 100);
  });
const test1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(propTotalData);
      resolve(propTotalData);
    }, 2000);
  });

const getCellData = (val: any) => {
  console.log(val);
};
const getChangedDate = (val: any) => {
  console.log(val);
};
</script>
