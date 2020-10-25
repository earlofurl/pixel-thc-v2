<template>
  <div>
    {{ model}}
    <q-select
      outlined
      v-model="computed_model"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :label="label"
      :options="options"
      @filter="filterFn"
      v-bind:style="{ width: size}"
      emit-value
      map-options
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">No results</q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script>
export default {
  props: ['optionList', 'label', 'size', 'default'],
  data() {
    return {
      options: [],
      model: this.default
    }
  },
  computed: {
    computed_model: {
      get() {
        const rs = this.options.filter(row => row.value === this.model)
        return rs.length === 1 ? rs[0] : rs
      },
      set(v) {
        this.model = v.value
      }
    }
  },
  methods: {
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.options = this.optionList
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options = this.optionList.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    }
  }
}
</script>
