#include <stdio.h>

#define PRICE 10

main()
{
	while (1) {
		printf("�ֹ��Ͻ� ��ǰ�� ������ �Է��Ͻʽÿ� <10���̻�>");
		int integer;
		scanf_s("%d", &integer);

		if (integer == 0) {
			printf("���ڸ� �Է��ؾ� �մϴ�.\n\n");
		}
		else if (integer < 10) {
			printf("�ֹ������� �ּ� 10���̻��� �Ǿ�� �մϴ�.\n\n");
		}
		else {
			if (integer < 50) {
				printf("�ǸŰ��� = %1f\n\n", integer * PRICE * 0.97);
			}
			else if (50 <= integer < 70) {
				printf("�ǸŰ��� = %1f\n\n", integer * PRICE * 0.95);
			}
			else if (70 <= integer < 100) {
				printf("�ǸŰ��� = %1f\n\n", integer * PRICE * 0.93);
			}
			else {
				printf("�ǸŰ��� = %1f\n\n", integer * PRICE * 0.90);
			}
		}
		rewind(stdin);
	}
}