import { useEffect } from 'react';
import { useModel } from 'umi';
import Popup from './popup';
import './index.less'

function MapWrapper() {
  const { setTarget } = useModel('useMap');

  useEffect(() => {
    setTarget('map-container');

    return function () {
      setTarget("")
      const dom = document.getElementById('map-container');
      if (dom) {
        dom.innerHTML = '';
      }
    }
  }, [])
  return (
    <>
      <div id="map-container" className="map-container" style={{ width: '100%', height: '100%' }}></div>
      <Popup />
    </>
  )
}


export default MapWrapper;
