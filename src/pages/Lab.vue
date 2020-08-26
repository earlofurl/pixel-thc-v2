<template>
  <div class="q-pa-md">
    <LabTable />
  </div>
</template>

<script>
import LabTable from "components/LabTable";

export default {
  name: "Lab",
  components: {LabTable},
  data() {
    return {
      labResults: [],
    };
  },
};
</script>
