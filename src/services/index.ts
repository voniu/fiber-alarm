import { request } from '@@/plugin-request'

function locationConverter<T>(item: any): T {
    return { ...item, location: JSON.parse(item.location) }
}

function getFiberList() {
    return request('/api/view/fiber').then(res => {
        console.log(res.success, res)
        if (!res.success) return res;
        res.data = res.data.map(locationConverter)
        return res;
    })
}
function getFiberDetail(id: number) {
    return request(`/api/view/fiber/${id}`).then(res => {
        if (!res.success) return res;
        res.data = locationConverter(res.data)
        return res
    })
}
function getCameraList() {
    return request('/api/view/camera').then(res => {
        if (!res.success) return res;
        res.data = res.data.map(locationConverter)
        return res
    })
}
function getCameraDetail(id: number) {
    return request(`/api/view/camera/${id}`).then(res => {
        if (!res.success) return res;
        res.data = locationConverter(res.data)
        return res
    })
}
function getAlarmList(props: {
    fiberId?: number;
    page?: number;
    pageSize?: number;
}) {
    if (props.fiberId === 0) delete props.fiberId;
    return request('/api/view/alarm', { params: props })
}

function getAlarmDetail(id: number) {
    return request(`/api/view/alarm/${id}`)
}

export default {
    getFiberList,
    getFiberDetail,
    getCameraList,
    getCameraDetail,
    getAlarmList,
    getAlarmDetail
}