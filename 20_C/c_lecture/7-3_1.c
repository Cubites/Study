#include <stdio.h>

int year_pay(num);
int tax();

main()
{
	int pay;
	while (1) {
		printf("월급여를 입력하시오 : ");
		scanf_s("%d", &pay);
		printf("월 급여 = %d, 년급여 = %d, 세금 = %d\n\n", pay, year_pay(pay), tax());
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