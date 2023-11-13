import React, { useEffect } from "react";
import * as echarts from 'echarts';
import { ConicalColumnChart } from "@jiaminghi/data-view-react";
import icon1 from '@/assets/pic_ico_01.png';
import icon2 from '@/assets/pic_ico_02.png';
import icon3 from '@/assets/pic_ico_03.png';

const config = {
    data: [
        {
            name: '综合指标',
            value: 550
        },
        {
            name: '指标A',
            value: 1200
        },
        {
            name: '指标',
            value: 711
        },
        {
            name: '指标C',
            value: 874
        }
    ],
    img: [
        icon1,
        icon2,
        icon3,
        icon1,
    ],
    showValue: true
}
export default function () {
    useEffect(() => {
        let myChart = echarts.init(document.getElementById('container_huan'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['非法入侵', '动物干扰', '天气影响', '地质灾害', '设备故障'],
                textStyle: {
                    color: "#e9ebee"
                }
            },
            series: [
                {
                    name: '行业数据',
                    type: 'pie',
                    center: ['80%', '50%'],
                    radius: ['50%', '80%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: [
                        { value: 335, name: '非法入侵' },
                        { value: 310, name: '动物干扰' },
                        { value: 234, name: '天气影响' },
                        { value: 135, name: '地质灾害' },
                        { value: 1548, name: '设备故障' }
                    ]
                }
            ]
        });
    }, [])
    return <>
        <div className="analysis">报警分类占比：</div>
        <div className="danger_contain_box">
            <div id="container_huan" style={{ width: '100%', height: '90%' }}></div>
        </div>
        <div className="danger_depart_box">
            <ConicalColumnChart config={config} style={{ width: '100%', height: '80%' }} />
        </div>
    </>
}