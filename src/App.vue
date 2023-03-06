<template>
  <vue3ExtendCalendar
    :data="data"
    :totalData="propTotalData"
    :dateScope="['2023-01', '2023-10']"
    @getCellData="getCellData"
    @getChangedDate="getChangedDate"
  >
    <template #dateCellContent="{ data }">
      {{ data?.data }}
    </template>
    <template #weekCellContent="{ data }">
      {{ data?.data }}
    </template>
  </vue3ExtendCalendar>
</template>

<script setup lang="ts">
import vue3ExtendCalendar from '../lib/vue3-extend-calendar.vue';

import { onBeforeMount, ref } from 'vue';
const data: any = ref([]);

const propTotalData = ref<any>([]);

const getCellData = (val: any, el: any) => {
  console.log(val);
};
const getChangedDate = (val: any) => {
  getCalendarData();
  getTotalData();
};

const getCalendarData = async () => {
  data.value = [];
  setTimeout(() => {
    data.value = [
      { date: '2023-02-01', cash: '11719', point: '-1', charge: '212', exchange: null },
      { date: '2023-02-02', cash: '46219', point: null, charge: '10100', exchange: '1008' },
      { date: '2023-02-03', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-04', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-05', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-06', cash: '37590', point: null, charge: '10', exchange: null },
      { date: '2023-02-07', cash: '86736', point: null, charge: '301', exchange: '1000' },
      { date: '2023-02-08', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-09', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-10', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-11', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-12', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-13', cash: '150540', point: null, charge: '35005', exchange: null },
      { date: '2023-02-14', cash: '10301', point: null, charge: '15301', exchange: null },
      { date: '2023-02-15', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-16', cash: '8601', point: '210', charge: '8500', exchange: null },
      { date: '2023-02-17', cash: '21002', point: null, charge: '21002', exchange: null },
      { date: '2023-02-18', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-19', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-20', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-21', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-22', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-23', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-24', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-25', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-26', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-27', cash: null, point: null, charge: null, exchange: null },
      { date: '2023-02-28', cash: null, point: null, charge: null, exchange: null },
    ];
  }, 2000);
};
const getTotalData = async () => {
  propTotalData.value = [];
  setTimeout(() => {
    propTotalData.value = dummy;
  }, 1500);
};

const dummy = [
  { cash: '57938', point: '-1', charge: '10312', exchange: '1008', order: 1 },
  { cash: '124326', point: '0', charge: '311', exchange: '1000', order: 2 },
  { cash: '190444', point: '210', charge: '79808', exchange: '0', order: 3 },
  { cash: '0', point: '0', charge: '0', exchange: '0', order: 4 },
  { cash: '0', point: '0', charge: '0', exchange: '0', order: 5 },
  { order: 'month', cash: '372708', point: '209', charge: '90431', exchange: '2008' },
];

onBeforeMount(() => {
  getTotalData();
  getCalendarData();
});
</script>
