# Implementação rápida

### Importar o cyclopay.js

`<script src="https://cdn.jsdelivr.net/gh/EvangelicNose/cyclopay-embed-form/main.58d7f1fe.js"></script>`



Isso faz com que seja importada uma váriável global chamada `cyclopay`.

## Inicializando o formulário

Criar uma div com o id "cp-form"

`<div id="cp-form"></div>`

E logo abaixo chamar a função: 

`<script>
	cyclopay.start();
</script>`

E está tudo pronto para construir o formulário.


### Construir os formulários desejados
Criar formulário de customer (opcional):

`<script>
	cyclopay.createCustomerForm();
</script>`

Criar formulário de cartão:

`<script>
	cyclopay.createCardForm();
</script>`

E então renderizar o form:

`<script>
	cyclopay.init();
</script>`


Com isso um formulário funcional está criado.

# Customização do formulário Customer:

O formulário customer já cria automaticamente os seguintes campos:

- Nome (first_name)
- Sobrenome (last_name)
- Telefone (mobile_phone)
- Email (email)

Essas informações são requeridas pelo sistema da Cyclopay para a criação de um novo customer, mas outros campos podem ser incluidos no form do Customer, chamando a criação do formulário da seguinte maneira:

`<script>
	cyclopay.createCustomerForm([{
		document: true
	},]);
</script>`

Dessa forma será criado os inputs de documento, que podem ser CNPJ ou CPF.
Outros argumentos podem ser usados para criar formulários de endereço de cobrança e/ou endereço de entrega, como:

`<script>
	cyclopay.createCustomerForm([{
		shipping_address: true,
		billing_address: true
	},]);
</script>`

# Definições de retorno

Em caso de sucesso na submissão do formulário, pode ser declarado uma ação customizada, usando o onSuccess:

`<script>
	cyclopay.onSuccess = function() {
		return alert("Formulário enviado com successo!")
	}
</script>`

Igual ao caso de successo, você pode declarar ações customizadas para casos de erro, usando o onError:

`<script>
	cyclopay.onError = function() {
		return alert("Ocorreu um erro, tente novamente mais tarde")
	}
</script>`

# Definições das funções do cyclopay.js:

| Função      | Args | Descrição |
| ----------- | ----------- | ----------- |
| start()      | ---        | Função para inicialização do cyclopay.js
| createCardFrom()   | ---        | Função para criação do formulário de cartão
|init()| ---|Função de renderização do formulário
|createCustomerForm() | document: _Boolean_ \| billing_address: _Boolean_ \| shipping_address: _Boolean_| Função para criação do formulário do Customer
|onSuccess()| _func_|Função de tratativa em caso de sucesso
|onError()| _func_|Função de tratativa em caso de erro

