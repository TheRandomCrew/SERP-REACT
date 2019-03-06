import React, { Component } from 'react'
import axios from 'axios'
import HomeView from '../Home/HomeView';
import Search from '../Home/Search';
// import Resume from '../Home/Resume';
// import Export from '../Home/Export';
import SERPTable from '../Home/Table/SERPTable';
import RankTable from '../Home/Table/RankTable';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = defaultState
    }

    render() {
        const { query, filter, ip, expand } = this.state
        const { filterKeys, eraseKeys } = filter
        return (
            <HomeView
                toggle={this.toggle}
                expand={expand}
                searchForm={
                    <Search
                        set={this.set}
                        filterKeys={filterKeys}
                        eraseKeys={eraseKeys}
                        ip={ip}
                    >
                    </Search>
                }
                // exportArea={
                //     <Export
                //         stats={stats}
                //         set={this.set}
                //         serpData={serpData}
                //     />
                // }
                // overview={<Resume
                //     query={query}
                //     set={this.set}
                // />
                // }
                isSearching={
                    query.keywords !== '' ? true : false
                }
                serpTable={<SERPTable
                    query={query}
                    filter={filter}
                    set={this.set}
                />
                }
                rankTable={<RankTable
                    query={query}
                />
                }
            />
        )
    }

    componentWillMount() {
        this.getIP()
    }

    componentDidMount() {
        this.getAWS()
    }

    getAWS = () => {
        axios({
            method: 'get',
            url: `http://server.borjamediavilla.com/api/aws_queries_list`, //http://localhost:8000 || http://server.borjamediavilla.com
            crossdomain: true
        })
            .then((res) => {
                console.log(res.data)


            })
            .catch((err) => {
                console.log(err)
            })
    }

    getIP = () => {
        axios.get('http://api.ipify.org', {
        })
            .then((res) => {
                const ip = res.data
                this.setState({ ...this.state, ip })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    set = (key, value) => {
        this.setState({ [key]: value });
    };

    toggle = (key) => {
        this.setState({ [key]: !this.state[key] })
    }
}

const defaultState = {
    query: {
        keywords: '',
        select: "ES:es:Spain:Spanish:26"
    },
    filter: {
        minVolume: 0,
        maxVolume: 1000000,
        minAdwords: 0,
        maxAdwords: 100,
        minCPC: 0,
        maxCPC: 1000,
        filterKeys: '',
        eraseKeys: ''
    },
    stats: { total_count: '', results_time: '-' },
    serpData: [
        { key: '-', volume: 0, cpc: 0, competencia: 0 }
    ],
    copied: false,
    ip: '0.0.0.1',
    expand: false
}