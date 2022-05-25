var dateTime = luxon.DateTime;

const app = new Vue({
    el: "#app",
    data: {
        currentIndex: 0,
        newMessage: '',
        searchName: '',
        alertNotifications: true,
        menu: false,
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ]
    },
    computed: {
        filterNameChat() {
            this.changeVisible();
        }
    },
    methods: {
        deleteAlert() {
            this.alertNotifications = false;
        },
        DropDownMenu() {
            this.menu = !this.menu;
        },
        deleteMessage(currentIndex, index) {
            this.contacts[currentIndex].messages[index].splice(index, 1);
        },
        changeVisible() {
            this.searchName = this.searchName.toLowerCase();
            this.contacts.forEach(elm => {
                if ( this.searchName !== ' ' && !elm.name.toLowerCase().includes(this.searchName)) {
                    elm.visible = false;
                } else if (this.searchName !== null) {
                    elm.visible = true;
                }
            });
        },
        latestMessage(index) {
            return this.contacts[index].messages[this.contacts[index].messages.length - 1].message;
        },
        getHoursAndMinutes(index) {
            const date = this.contacts[index].messages[this.contacts[index].messages.length - 1].date;
            const hoursMinutes = date.substr(11, 5);
            return `${hoursMinutes}`;
        },
        getHoursAndMinutes(currentIndex) {
            const date = this.contacts[currentIndex].messages[this.contacts[currentIndex].messages.length - 1].date;
            const hoursMinutes = date.substr(11, 5);
            return `${hoursMinutes}`;
        },
        chosenChat(index) {
            this.currentIndex = index;
        },
        getHoursAndMinutesChat(index) {
            const date = this.contacts[this.currentIndex].messages[index].date;
            const hoursMinutes = date.substr(11, 5);
            return `${hoursMinutes}`;
        },
        sendNewMessage(currentIndex) {
            const d = dateTime.now().toFormat("dd/LL/yyyy HH:mm:ss");
            const date = d.toString();
            if(this.newMessage !== ' ' && this.newMessage !== null) {
                const newMessage = {
                    date: `${date}`,
                    message: this.newMessage,
                    status: 'sent',
                };
                this.contacts[currentIndex].messages.push(newMessage);
                this.newMessage = '';
            }
            setTimeout(() => {
                const newReceivedMessage = {
                    date: `${date}`,
                    message: 'Ok!',
                    status: 'received',
                }
                this.contacts[currentIndex].messages.push(newReceivedMessage);
            }, 1000);
        },
    }
});