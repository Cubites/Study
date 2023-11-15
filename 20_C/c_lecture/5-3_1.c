#include <stdio.h>

#define PRICE 10

main()
{
	while (1) {
		printf("주문하실 제품의 개수를 입력하십시오 <10개이상>");
		int integer;
		scanf_s("%d", &integer);

		if (integer == 0) {
			printf("숫자를 입력해야 합니다.\n\n");
		}
		else if (integer < 10) {
			printf("주문수량은 최소 10개이상이 되어야 합니다.\n\n");
		}
		else {
			if (integer < 50) {
				printf("판매가격 = %1f\n\n", integer * PRICE * 0.97);
			}
			else if (50 <= integer < 70) {
				printf("판매가격 = %1f\n\n", integer * PRICE * 0.95);
			}
			else if (70 <= integer < 100) {
				printf("판매가격 = %1f\n\n", integer * PRICE * 0.93);
			}
			else {
				printf("판매가격 = %1f\n\n", integer * PRICE * 0.90);
			}
		}
		rewind(stdin);
	}
}