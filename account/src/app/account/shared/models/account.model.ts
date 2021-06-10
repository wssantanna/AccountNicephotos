export class Account {
    public id: number;
    public nome: string;
    public email: string;
    public senha: string;
    public apelido: string;
    public cpf: string;
    public sexo: string;
    public dtNascimento: string;
    public dtDestino: Date;
    public ddd: string;
    public celular: string;
    public urlDestino: string;
    public codePromo: string;
    public actionId: string;
    public referralHuid: string;
    public cookieOrigemId: string;
    public recaptcha: string;
    public loginExternoNomeParceiro: string;
    public loginExternoTokenParceiro: string;
    public userId: number = 0;
    public receberEmail: boolean = true;
    public receberSms: boolean = true;
    public optId: true;
    public enderecos: [{
        logradouro;
        cep;
        bairro;
        cidade;
        estado;
        pais;
        tipo;
        responsavel;
        numero;
        completo;
        apelido;
        favorito;
        addressId: 0
    }];
    public dadosFiscais: [{
        documentoId: 0;
        tipoDocumento: 0;
        documento: string;
        razaoSocial: string;
        endereco: {
            logradouro;
            cep;
            bairro;
            cidade;
            estado;
            pais;
            tipo;
            responsavel;
            numero;
            complemento;
            apelido;
            favorito;
            addressId: 0;
        }
    }];
    favorito: boolean = true;
}