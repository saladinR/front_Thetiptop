// store.ts
import {defineStore} from 'pinia';
import axios from 'axios';
import router from "@/router";

interface State {
    message: string;
    isLoading: boolean;
    isConnected: boolean,
    historyList:[],
    responseOfticket: string,
}

export const useStore = defineStore({
    id: 'app', // A unique identifier for your store
    state: (): State => ({
        message: 'Hello from Pinia!',
        responseOfticket: '',
        historyList:[],
        isLoading: false,
        isConnected: false
    }),
    getters: {
        // Your getters here
    },
    actions: {
        updateMessage(newMessage: string) {
            this.message = newMessage;
        },
        async login(loginData: any) {
            this.isLoading = true
            try {
                const response = await axios.post('https://api.dsp-archiwebbo21a-sr.fr'+'/api/login_check', loginData);
                console.log("my data response",response.data.user.roles[0],response.data.token);
                if("ROLE_ADMIN" ==response.data.user.roles[0]) {
                    window.location.href = 'https://api.dsp-archiwebbo21a-sr.fr'+'/admin'
                }
                if (response.data.toString()) {
                    //console.log("connect ruessi",this.isConnected )
                    this.isConnected = true
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user',JSON.stringify(response.data.user) );

                   // console.log("connect ruessi",this.isConnected )
                }
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
                //console.error('Error authenticating:', error);
            }
        },
        async register(data: any) {
            console.log(data)
            data.roles= ["ROLE_USER"];
            console.log("data register;",data)
            this.isLoading = true
            try {
                const response = await axios.post('https://api.dsp-archiwebbo21a-sr.fr'+'/api/register', data);
                console.log(response);
                if (response.data) {
                    //this.responseOfticket=response.data
                    await this.login({email:data.email,password:data.password})
                }
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
            }
        },
        async tirage(data: any) {
            console.log(data)
            this.isLoading = true
            try {
                const response = await axios.post('https://api.dsp-archiwebbo21a-sr.fr'+'/api/tirage/valide', data);
                console.log(response);
                if (response.data) {
                    this.responseOfticket=response.data
                }
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
            }
        },
        async history(data: any) {
            console.log(data)
            this.isLoading = true
            try {
                const response = await axios.post('https://api.dsp-archiwebbo21a-sr.fr'+'/api/tirage/history\n', data);
                console.log(response);
                if (response.data) {
                    this.historyList=response.data
                }
                this.isLoading = false
            } catch (error) {
                this.isLoading = false
            }        },
    },
});