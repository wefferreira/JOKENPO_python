# JOKENPO_python

from random import randint
from time import sleep
itens = ('Pedra', 'Papel', 'Tesoura')
computador = randint(0,2)
print('''Suas opções:
[ 0 ] PEDRA
[ 1 ] PAPEL
[ 2 ] TESOURA''')
jogador = int(input('Qual é a sua jogada?'))
print('JO')
sleep(1)
print('KEN')
sleep(1)
print('PO!!')
sleep(1)
print('-='*11)
print(f'Computador jogou {itens[computador]}')
print(f'Jogador jogou {itens[jogador]}')
print('-='*11)
if computador == 0: #Computador jogou PEDRA
    if jogador == 0:
        print('EMPATE')
    elif jogador == 1:
        print('JOGADOR GANHOU')
    elif jogador == 2:
        print('COMPUTADOR GANHOU')
    else:
        print('OPÇÃO INVALIDA!!!')
elif computador == 1: #Computador jogou PAPEL
    if jogador == 0:
        print('COMPUTADOR GANHOU')
    elif jogador == 1:
        print('EMPATE')
    elif jogador == 2:
        print('JOGADOR GANHOU')
    else:
        print('OPÇÃO INVALIDA!!!')
elif computador == 2: #Computador jogou TESOURA
    if jogador == 0:
        print('JOGADOR GANHOU')
    elif jogador == 1:
        print('COMPUTADOR GANHOU')
    elif jogador == 2:
        print('EMPATE')
    else:
        print('OPÇÃO INVALIDA!!!')
