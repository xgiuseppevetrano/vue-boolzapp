var dateTime = luxon.DateTime;

const app = new Vue({
    el: "#app",
    data: {
        currentIndex: 0,
        newMessage: '',
        searchName: '',
        alertNotifications: true,
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
            return this.contacts.filter((contact) => contact.visible === true);
        }
    },
    methods: {
        latestMessage(index) {
            return this.contacts[index].messages[this.contacts[index].messages.length - 1].message;
        },
        getHoursAndMinutes(index) {
            const date = this.contacts[index].messages[this.contacts[index].messages.length - 1].date;
            return dateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss").toFormat('HH:mm');
        },
        chosenChat(index) {
            this.currentIndex = index;
        },
        getHoursAndMinutesChat(index) {
            const date = this.contacts[this.currentIndex].messages[index].date;
            return dateTime.fromFormat(date, "dd/MM/yyyy HH:mm:ss").toFormat('HH:mm');
        },
        sendNewMessage(currentIndex) {
            const date = dateTime.now().toFormat("dd/LL/yyyy HH:mm:ss");
            if(this.newMessage !== ' ' && this.newMessage !== null) {
                const newMessage = {
                    date: `${date}`,
                    message: this.newMessage,
                    status: 'sent',
                    menu: false,
                };
                this.contacts[currentIndex].messages.push(newMessage);
                this.newMessage = '';
            }
            setTimeout(() => {
                const newReceivedMessage = {
                    date: `${date}`,
                    message: 'Ok!',
                    status: 'received',
                    menu: false,
                }
                this.contacts[currentIndex].messages.push(newReceivedMessage);
            }, 1000);
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
        deleteAlert() {
            this.alertNotifications = false;
        },
        DropDownMenu(message) {
            message.menu = !message.menu;
        },
        deleteMessage(index) {
            this.contacts[this.currentIndex].messages.splice(index, 1);
        }
    },
    created() {
        this.contacts
            .forEach(contact => contact.messages
                .forEach(message => Vue.set(message, 'menu', false)));
    },
});