import React, { useEffect } from "react";
import * as echarts from 'echarts';
import { ConicalColumnChart } from "@jiaminghi/data-view-react";
import icon1 from '@/assets/pic_ico_01.png';
import icon2 from '@/assets/pic_ico_02.png';
import icon3 from '@/assets/pic_ico_03.png';

const config = {
    data: [
        {
            name: 'Type A',
            value: 550
        },
        {
            name: 'Type B',
            value: 1200
        },
        {
            name: 'Type C',
            value: 711
        },
        {
            name: 'Type D',
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
                data: ['Illegal Intrusion', 'Animal Disruption', 'Weather Affection', 'Geological Disaster', 'Equipment Fault'],
                textStyle: {
                    color: "#e9ebee"
                }
            },
            series: [
                {
                    name: 'Alarm Data',
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
                        { value: 335, name: 'Illegal Intrusion' },
                        { value: 310, name: 'Animal Disruption' },
                        { value: 234, name: 'Weather Affection' },
                        { value: 135, name: 'Geological Disaster' },
                        { value: 1548, name: 'Equipment Fault' }
                    ]
                }
            ]
        });
    }, [])
    return <>
        <div className="analysis">Alarm Analytics:</div>
        <div className="danger_contain_box">
            <div id="container_huan" style={{ width: '100%', height: '90%' }}></div>
        </div>
        <div className="danger_depart_box">
            <ConicalColumnChart config={config} style={{ width: '100%', height: '80%' }} />
        </div>
    </>
}