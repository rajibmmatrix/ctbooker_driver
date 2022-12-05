import {StyleSheet} from 'react-native';
import {COLORS} from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowAllCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCenterSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  allCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  space: {
    justifyContent: 'space-between',
  },
  line: {
    height: 1,
    color: COLORS.Gray,
  },
  shadow: {
    shadowColor: COLORS.Dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default styles;
