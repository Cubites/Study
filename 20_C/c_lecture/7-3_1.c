#include <stdio.h>

int year_pay(num);
int tax();

main()
{
	int pay;
	while (1) {
		printf("���޿��� �Է��Ͻÿ� : ");
		scanf_s("%d", &pay);
		printf("�� �޿� = %d, ��޿� = %d, ���� = %d\n\n", pay, year_pay(pay), tax());
	}
}

int year_pay(num)
{
	return num * 12;
}

int tax()
{
	return 10000;
}