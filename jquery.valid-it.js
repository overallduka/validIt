(function($){
    
    $.fn.validIt = function(options){
        var valid;
        base = this;
        addEvent(options);
        
        function IsEmail(email) {
          var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          return regex.test(email);
        }

        function validLength(val, size, max, min){
            length = val.toString().length;
            if(size){
                if(length == size)
                    return true;
            }else if(min && !max){
                if(length >= min)
                    return true;
            } else if(!min && max){
                if(length <= max)
                    return true;
            } else if(min && max){
                if(length >= min && length <= max)
                    return true;
            } else {
                return false;    
            }
        }

        
        function validPhone(phone_number){
            phone_number = phone_number.replace(/-| |\)|\(+/g,'');
            nineth_digit = phone_number[2];
            first_digit = phone_number[0];
            if (phone_number.length == 11 && nineth_digit != '9')
                return false;
            if (first_digit == '0')
                return false;
            if (phone_number.length > 11 || phone_number.length < 10)
                return false;
            return true;
        }

        function validBirthday(text) {
           var comp = text.split('/');
            if (comp.length != 2) return false;
            var d = parseInt(comp[0], 10);
            var m = parseInt(comp[1], 10);
            if(m > 12 || m < 1) return false;
            if(d > 31 || d < 1) return false;
            return true;
        }
       
        function validCEP(val){
            if(val.length == 9 && val.charAt(5) == "-")
                return true;
            else
                return false;
        }

     
function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;

    return true;

}
   
    function validaCPF(cpf){

        cpf = cpf.replace (/,/g, ""); // remove a virgula
        cpf = cpf.replace (/\./g, ""); // remove a virgula
        cpf = cpf.replace (/-/g, ""); // remove a virgula

        var numeros, digitos, soma, i, resultado, digitos_iguais;

        if(validarCNPJ(cpf).toString() == "true") return true

        digitos_iguais = 1;
        if (cpf.length < 11)
              return false;
        for (i = 0; i < cpf.length - 1; i++)
              if (cpf.charAt(i) != cpf.charAt(i + 1)){
                    digitos_iguais = 0;
                    break;
                }
        if (!digitos_iguais){
              numeros = cpf.substring(0,9);
              digitos = cpf.substring(9);
              soma = 0;
              for (i = 10; i > 1; i--)
                    soma += numeros.charAt(10 - i) * i;
              resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
              if (resultado != digitos.charAt(0))
                    return false;
              numeros = cpf.substring(0,10);
              soma = 0;
              for (i = 11; i > 1; i--)
                    soma += numeros.charAt(11 - i) * i;
              resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
              if (resultado != digitos.charAt(1))
                    return false;
              return true;
        } else {
            return false;
        }
     }

        function validForm(){
            if(base.find('.invalid').length > 0){
                return false;
            } else {
                return true;
            }
        }



        function addEvent(options){

            if(options.type == 'form'){
                if(validForm()){
                    if(options.onValid)
                        options.onValid();
                } else {
                    if(options.onInvalid)
                        options.onInvalid();
               }
            } else {

                    base.on('change keyup paste click focusout', function(){
                        var val = this.value.toString();
                   
                        switch(options.type){

                            case 'email':
                                if(IsEmail(val) || val == ''){
                                    setValid(val, this);
                                } else {
                                    setInvalid(val, this);
                                }
                            break;

                            case 'length':
                                if(validLength(val,options.size, options.max, options.min)){
                                    setValid(val, this);
                                } else {
                                    setInvalid(val, this);
                                }
                            break;

                            case 'phone':
                                if(validPhone(val)){
                                    setValid(val, this);
                                } else {
                                    setInvalid(val, this);
                                }
                            break;

                            case 'cep':
                                if(validCEP(val)){
                                    setValid(val, this);
                                } else {
                                    setInvalid(val, this);
                                }
                            break;

                            case 'cpf':
                                if(validaCPF(val)){
                                    setValid(val, this);
                                } else {
                                    setInvalid(val, this);
                                }
                            break;

                            case 'birthday':
                                if(validBirthday(val)){
                                    setValid(val, this);   
                                } else {
                                    setInvalid(val, this);
                                }
                            break;

                               
                        }
                    });
            }
        }

        function setValid(val, ele){
            $(ele).removeClass('invalid');
            if(options.onValid)
                options.onValid(val);
            if(options.onChange)
               options.onChange(); 
        }

        function setInvalid(val, ele){
            $(ele).addClass('invalid');
            if(options.onInvalid)
                options.onInvalid(val);
            if(options.onChange)
               options.onChange(); 
        }
 
    }

    
    
}(jQuery));

