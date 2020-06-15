import React , {useState} from 'react';
import './Tab.css'

export default function Tab(props) {
    const [activeTab , setActiveTab] = useState(0)


    return (
        <div className="custom-tabs">
            {props.tabs.map((tab,i) => {
                return (
                <div key={tab.label} className={activeTab === i ? 'custom-tab active' : 'custom-tab'} onClick={() => {
                    setActiveTab(i)
                    props.onClick(tab)
                }}>{tab.label}</div>
                )
            })}
        </div>
    )
}