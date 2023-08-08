import api from '../config/configApi';

export const servDeleteAbout = async (idAbout) => {

    var status = false;

    const headers = {
        'headers': {
            'Authorization': "Bearer " + localStorage.getItem('token')
        }
    }

    await api.delete("/site-about/about/" + idAbout, headers)
        .then((response) => {
            status = {
                type: 'success',
                mensagem: response.data.mensagem
            };
        }).catch((err) => {
            if (err.response) {
                status = {
                    type: 'error',
                    mensagem: err.response.data.mensagem
                };
            } else {
                status = {
                    type: 'error',
                    mensagem: "Erro: Tente mais tarde!"
                };
            }
        });

    return status;
}