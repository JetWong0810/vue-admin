import { mapGetters } from 'vuex'
import CommonSearch from '@/components/base/search'
import ListTable from '@/components/base/list'
import TopOperation from '@/components/base/top'
import Dialogs from '@/components/base/dialog'

export default {
  components: {
    CommonSearch,
    ListTable,
    TopOperation,
    Dialogs
  },
  computed: {
    ...mapGetters(['pageName', 'commonConf'])
  },
  inject: ['eventBus'],
  methods: {
    processEvent(data) {
      this.$Util.Common.emitToEvent(this, 'listDataEvent', data)
    }
  }
}
