// método construtor
	public Pessoa(String nome, int idade, float altura) {
		setToDadosNome(nome);
		setToDadosIdade(idade);
		setToDadosAltura(altura);
	}

	// métodos get
	public String getFromDadosNome() {
		return this.dadosDePessoa.getNome();
	}

	public int getFromDadosIdade() {
		return this.dadosDePessoa.getIdade();
	}

	public float getFromDadosAltura() {
		return this.dadosDePessoa.getAltura();
	}

	// métodos set
	public void setToDadosNome(String nome) {
		this.dadosDePessoa.setNome(nome);
	}

	public void setToDadosIdade(int idade) {
		this.dadosDePessoa.setIdade(idade);
	}

	public void setToDadosAltura(float altura) {
		this.dadosDePessoa.setAltura(altura);
	}
