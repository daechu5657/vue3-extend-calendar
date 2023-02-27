<template>
  <section class="vue3-extend-calendar-wrap" :data-darkMode="darkMode">
    <section class="vue3-extend-calendar-loading" :class="{ hide: !loading }" :data-darkMode="darkMode">
      <div class="loading-items">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </section>
    <section class="vue3-extend-calendar-title">
      <span class="arrow-btn" @click="changeCalendar('month', -1)" :class="{ disabled: !expectationDate.min }">
        <i class="arrow arrow-left" :data-darkMode="darkMode"></i>
      </span>
      <span class="date" :key="current.YYYYMM">
        {{ current.YYYYMM }}
      </span>
      <span class="arrow-btn" @click="changeCalendar('month', 1)" :class="{ disabled: !expectationDate.max }">
        <i class="arrow arrow-right" :data-darkMode="darkMode"></i>
      </span>
    </section>
    <section class="vue3-extend-calendar-content">
      <table class="vue3-extend-calendar">
        <thead class="vue3-extend-calendar-thead">
          <tr>
            <th v-for="(item, index) in columns" :key="index">
              <slot name="headerCell" :data="item">{{ item }}</slot>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(items, index) in showData" :key="index">
            <td
              v-for="(item, idx) in items"
              :key="idx"
              class="vue3-extend-calendar-tbody"
              @click="() => getCellData(item)"
            >
              <div
                class="vue3-extend-calendar-tbody-inner-wrap"
                :class="{ null: item.date === null, today: item.fullDate === dayjs().format('YYYY-MM-DD') }"
                :data-darkMode="darkMode"
              >
                <div class="vue3-extend-calendar-tbody-date">
                  <slot name="dateCellTitle" class :data="item" v-if="item.date !== null && !item.duration">
                    {{ item.date }}
                  </slot>
                  <slot name="nullCellContent" :data="item" v-if="item.date === null" />
                  <slot name="weekCellTitle" :data="item" v-if="item.date === 'Week'"> </slot>
                  <slot name="monthCellTitle" :data="item" v-if="item.date === 'Month'"> </slot>
                </div>

                <div class="vue3-extend-calendar-tbody-content-wrap" :data-darkMode="darkMode">
                  <slot name="dateCellContent" :data="item" v-if="item.date !== null && !item.duration" />
                  <slot name="nullCellTitle" :data="item" v-if="item.date === null" />
                  <slot name="weekCellContent" :data="item" v-if="item.date === 'Week'" />
                  <slot name="monthCellContent" :data="item" v-if="item.date === 'Month'" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, computed, ref, ComputedRef, watch } from 'vue';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const emits = defineEmits(['getCellData', 'getChangedDate']);
const props = defineProps({
  data: { type: Array, default: [], require: false },
  total: { type: Boolean, default: true, require: false },
  totalData: { type: Array, require: false },
  columns: { type: Array, default: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Total'], require: false },
  darkMode: { type: Boolean, default: false, require: false },
  dateScope: { type: Array, default: ['0000-00', '9999-99'], require: false },
});
const propData = computed(() => props.data);
const propTotal = computed(() => props.total);
const propColumns = computed(() => props.columns);
const darkMode = computed(() => props.darkMode);
const propTotalData: ComputedRef<any> = computed((): any => props.totalData);
const dateScope: any = computed(() => props.dateScope);
const current: any = ref({
  year: dayjs().year(),
  month: dayjs().month() + 1,
  YYYYMM: computed(() => dayjs(current.value.year + '-' + current.value.month).format('YYYY-MM')),
});
const columns: any = ref([]);
const showData: any = ref([]);
const loading = ref(true);
const expectationDate = ref({
  min: computed(() =>
    dayjs(dayjs(current.value.YYYYMM).add(-1, 'month').format('YYYY-MM')).isSameOrAfter(dateScope.value[0])
  ),
  max: computed(() =>
    dayjs(dayjs(current.value.YYYYMM).add(1, 'month').format('YYYY-MM')).isSameOrBefore(dateScope.value[1])
  ),
});

const getBaseCalenderArr = (val: any) => {
  const result = new Promise<void>((resolve, reject) => {
    const injectMonth = computed(() => current.value.month - 1);
    const numberRepeat = dayjs().month(injectMonth.value).daysInMonth();

    const getFullDate = (val: number) => {
      return dayjs(current.value.YYYYMM)
        .date(val + 1)
        .format('YYYY-MM-DD');
    };
    const arr: any = [];
    const isEmpty = val.length > 0;
    if (isEmpty) {
      const isOrder = !val.map((e: any) => e.date).includes(undefined);
      if (isOrder) {
        for (let date = 0; date < numberRepeat; date++) {
          const dataPicker = () => {
            const result = val.filter((e: any) => {
              if (e.date === getFullDate(date)) {
                return e;
              }
            });
            return result[0] === undefined ? null : result[0];
          };
          arr.push({ fullDate: getFullDate(date), date: String(date + 1).padStart(2, '0'), data: dataPicker() });
        }
      } else {
        for (let date = 0; date < numberRepeat; date++) {
          arr.push({ fullDate: getFullDate(date), date: String(date + 1).padStart(2, '0'), data: val[date] });
        }
      }
    } else {
      for (let date = 0; date < numberRepeat; date++) {
        arr.push({ fullDate: getFullDate(date), date: String(date + 1).padStart(2, '0'), data: null });
      }
    }
    resolve(arr);
  });
  return result;
};
const setCalendar = async (arr: any) => {
  const result = await new Promise<void>((resolve, reject) => {
    let month: any = [];
    let week: any = {};

    const startPoint = dayjs(current.value.YYYYMM).startOf('month').day();

    for (let i = 0; i < startPoint; i++) {
      week[columns.value[i]] = { date: null, fullDate: null, data: null };
    }

    const daysInMonth = dayjs(current.value.YYYYMM).daysInMonth();
    const weeks = Math.ceil((startPoint + daysInMonth) / 7);
    const padding = 7 - ((startPoint + daysInMonth) % 7);

    for (let i = 0; i < daysInMonth + padding + weeks; i++) {
      const day = (startPoint + i) % 8;
      const weekIndex = Math.floor((startPoint + i) / 8);

      if (day === 7) {
        if (propTotal.value) {
          const duration: any = Object.values(week).filter((e: any) => e?.fullDate !== null);
          week['total'] = {
            date: 'Week',
            order: weekIndex + 1,
            duration: `${duration[0]?.fullDate}~${duration[duration.length - 1]?.fullDate}`,
          };
        }
        month.push(week);
        week = {};
      } else {
        const index = i - weekIndex;
        if (index >= arr?.length) {
          week[columns.value[day]] = {
            date: null,
            fullDate: null,
            data: null,
          };
          continue;
        }
        week[columns.value[day]] = arr[i - weekIndex];
      }
    }

    if (propTotal.value) {
      let monthTotal: any = {};

      for (let i = 0; i < 7; i++) {
        monthTotal[columns.value[i]] = {
          date: null,
          data: null,
        };
      }

      const startYYYYMMDD = dayjs(current.value.YYYYMM).startOf('month').format('YYYY-MM-DD');
      const endYYYYMMDD = dayjs(current.value.YYYYMM).endOf('month').format('YYYY-MM-DD');

      monthTotal['total'] = {
        date: 'Month',
        duration: `${startYYYYMMDD}~${endYYYYMMDD}`,
      };
      month.push(monthTotal);
    }

    resolve(month);
  });

  return result;
};
const setTotalData = async (val: any) => {
  const result = new Promise<void>((resolve, reject) => {
    const arr = val.slice(0);
    const isOrder = propTotalData.value.map((e: any) => e.duration).includes(undefined);

    if (isOrder) {
      propTotalData.value?.forEach((item: any) => {
        arr.filter((el: any) => {
          const duration = el.total.duration.replaceAll(' ', '');
          if (duration === item.duration) {
            el.total.data = item;
          }
        });
      });
    } else {
      propTotalData.value?.forEach((item: any, index: number) => {
        arr[index].total.data = item;
      });
    }

    resolve(arr);
  });
  return result;
};
const process = async () => {
  loading.value = true;
  columns.value = propColumns.value;
  columns.value.length = 8;

  if (!propTotal.value) columns.value.pop();

  const getBaseArr = await getBaseCalenderArr(propData.value);
  const getCalendar = await setCalendar(getBaseArr);

  if (!propTotal.value) {
    showData.value = getCalendar;
    loading.value = false;
  } else {
    showData.value = await setTotalData(getCalendar);
    loading.value = false;
  }
};
const changeCalendar = (type: any, value: number) => {
  current.value[`${type}`] += value;
  emits('getChangedDate', current.value.YYYYMM);
};
const getCellData = (cellData: any) => {
  const data = JSON.parse(JSON.stringify(cellData));

  if (data?.date !== null) {
    if (Number(data.date)) {
      data.date = Number(data.date);
    }
    emits('getCellData', cellData);
  }
};

onBeforeMount(async () => {
  await process();
});

watch(
  () => propData,
  (val: any) => {
    process();
  },
  {
    deep: true,
  }
);
watch(
  () => propTotalData,
  (val: any) => {
    process();
  },
  {
    deep: true,
  }
);
watch(
  current,
  async (val: any) => {
    if (val.month >= 13) {
      current.value.month = 1;
      current.value.year += 1;
    } else if (val.month <= 0) {
      current.value.month = 12;
      current.value.year -= 1;
    }

    await process();
  },
  { deep: true }
);
watch(
  propColumns,
  async (val: any) => {
    process();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', Segoe UI Symbol, 'Noto Color Emoji';
}
.vue3-extend-calendar-wrap {
  position: relative;
  background: #fff;
  color: #000000d9;
}
.vue3-extend-calendar {
  position: relative;
  border-collapse: collapse;
  table-layout: fixed;
  display: table;
  box-sizing: border-box;
  border-color: grey;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: right;
  border: 0;
  td {
    padding: 0;
    margin: 0;
  }
}
.vue3-extend-calendar-title {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  .date {
    font-weight: 600;
    font-size: 30px;
    line-height: 1.35;
    padding: 0 20px;
    min-width: 200px;
    text-align: center;
  }
  .arrow-btn {
    width: 12.5px;
    height: 27.5px;
    &.disabled {
      opacity: 0.2;
      cursor: default;
      pointer-events: none;
    }
  }
  .arrow {
    display: block;
    width: 12.5px;
    height: 27.5px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    position: relative;
    top: 2px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.5;
    }
  }
  .arrow-right {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'%3E%3C!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --%3E%3Cpath d='M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z'/%3E%3C/svg%3E");
  }
  .arrow-left {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'%3E%3C!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --%3E%3Cpath d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z'/%3E%3C/svg%3E");
  }
}
.vue3-extend-calendar-loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  display: block;
  width: 100%;
  height: 100%;
  background: rgb(255 255 255 / 50%);
  transition: background 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  &.hide {
    display: none;
  }
  .loading-items {
    position: relative;
    display: inline-block;
    font-size: 20px;
    width: 1em;
    height: 1em;
    transform: rotate(45deg);
    animation: rotate 1.2s infinite linear;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    .item {
      position: absolute;
      display: block;
      width: 9px;
      height: 9px;
      background-color: #1890ff;
      border-radius: 100%;
      transform: scale(0.75);
      transform-origin: 50% 50%;
      opacity: 0.3;
      animation: spinMove 1s infinite linear alternate;
    }
    .item:nth-child(1) {
      top: 0;
      left: 0;
    }

    .item:nth-child(2) {
      top: 0;
      right: 0;
      animation-delay: 0.4s;
    }

    .item:nth-child(3) {
      right: 0;
      bottom: 0;
      animation-delay: 0.8s;
    }

    .item:nth-child(4) {
      bottom: 0;
      left: 0;
      animation-delay: 1.2s;
    }
    @keyframes spinMove {
      to {
        opacity: 1;
      }
    }
    @keyframes rotate {
      to {
        transform: rotate(405deg);
      }
    }
  }
}
.vue3-extend-calendar-content {
  // color: #000000d9;
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
}
.vue3-extend-calendar-thead {
  border-color: inherit;
  th {
    height: auto;
    padding: 0 12px 5px 0;
    line-height: 18px;
    width: 36px;
    font-weight: 400;
    text-align: right;
  }
}
.vue3-extend-calendar-tbody {
  vertical-align: middle;
  border-color: inherit;

  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }
  &-inner-wrap {
    width: auto;
    height: auto;
    margin: 0 4px;
    // padding: 4px 8px 0;
    padding: 4px 8px;
    border: 0;
    border-top: 2px solid #f0f0f0;
    border-radius: 0;
    transition: background 0.3s;
    margin: 0 4px;
    cursor: pointer;
    &:hover {
      background-color: #f5f5f5;
    }
    &.null {
      cursor: default;
      pointer-events: none;
    }
    &.today {
      color: #1890ff;
      background: #e6f7ff;
    }
  }
  &-date {
    line-height: 24px;
    transition: color 0.3s;
    text-align: right;
    min-height: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &-content-wrap {
    position: static;
    width: auto;
    min-height: 86px;
    max-height: 86px;
    overflow-y: auto;
    // color: #000000d9;
    line-height: 1.5715;
    text-align: left;
    text-overflow: ellipsis;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 3px;
      background-color: #f0f0f0;
      margin: 1px;
      border-radius: 1rem;
    }
    &::-webkit-scrollbar-thumb {
      width: 3px;
      background-color: #aaa;
      border-radius: 1rem;
    }
  }
  &-content {
    display: block;
    width: auto;
    height: auto;
    margin: 0 4px;
    padding: 4px 8px 0;
    border: 0;
    border-top: 2px solid #f0f0f0;
    border-radius: 0;
    transition: background 0.3s;
  }
}

[class='vue3-extend-calendar-wrap'][data-darkMode='true'] {
  color: #ffffffa6;
  background: #141414;
}
[class*='vue3-extend-calendar-tbody-inner-wrap'][data-darkMode='true'] {
  border-top: 2px solid #303030;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
}
[class*='vue3-extend-calendar-tbody-content-wrap'][data-darkMode='true'] {
  &::-webkit-scrollbar {
    width: 3px;
    background-color: #aaa;
    margin: 1px;
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    width: 3px;
    background-color: #f0f0f0;
    border-radius: 1rem;
  }
}
[class*='today'][data-darkMode='true'] {
  background: #111b26;
  color: #177ddc;
}
[class*='arrow'][data-darkMode='true'] {
  filter: invert(100%) sepia(3%) saturate(0%) hue-rotate(138deg) brightness(102%) contrast(103%);
  opacity: 0.8;
}
[class*='vue3-extend-calendar-loading'][data-darkMode='true'] {
  background: #1414148f;
}
</style>
