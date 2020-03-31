package Principal;

import Dados.Pessoa;
import Serviços.Servicos;
import Validação.Validacao;

public class Principal {

	public static void main(String[] args) {
		int indice = 0;
		do {
			// declarações
			final int TAMANHO = 1000;

			// instancia objeto
			Pessoa pessoas[] = new Pessoa[TAMANHO];

			// constroi o objeto pessoa de acordo com o indice atual.
			pessoas[indice] = new Pessoa(Validacao.pedeValidaNome(), Validacao.pedeValidaIdade(),
					Validacao.pedeValidaAltura());

			Servicos.mostraDados(pessoas[indice]);

			// incrementa o indice para o caso do usurario querer cadastrar mais uma pessoa
			indice++;

		} while (Validacao.validaContinua());

	}

}
