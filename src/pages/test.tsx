import Map from '@/components/map'
import { useModel } from 'umi';
import ee from '@/libs/events';

export default function () {
  const { toCenter, currentItem, selectFeature, clearSelected, getFeaturesByTypeAndId } = useModel('useMap');
  const { showPopup, hidenPopup } = useModel('useModel')
  const { centerTo } = useModel('useItems')
  return <div style={{ width: 800, height: 400 }}>
    <Map />
    <button onClick={showPopup}>show</button>
    <button onClick={hidenPopup}>hiden</button>
    <button onClick={() => toCenter([116.419791, 39.924453])}>toCenter</button>
    <button onClick={() => {
      if (getFeaturesByTypeAndId(234321, 'fiber')) {
        selectFeature(getFeaturesByTypeAndId(234321, 'fiber')!)
        centerTo(234321, 'fiber')
        showPopup()
      }
    }}>selectFeature</button>
    <button onClick={clearSelected}>clear</button>
    <button onClick={() => {
      ee.emit('ALARM', {
        id: 2132,
        description: '入侵警报',
        "fiber": {
          "id": 456,
          "name": "asdads",
        },
      })
    }}>test</button>
    <div>current: {currentItem.id}</div>
  </div>
};
