#include <stdio.h>

#define PRODUCT(X, Y) ((X)*(Y))

void sprint();

int main(void)
{
	int i = 10, j = 20;

	// ��ũ�� ��ó���� ����
	printf("i * j = %d\n\n", PRODUCT(i, j));


	// sprint �Լ��� ȣ���մϴ�.
	sprint();

	printf("C����� �⺻������ ������ ���α׷��Դϴ�.\n\n");

	return 0;
}

void sprint()
{
	printf("sprint �Լ����� ����߽��ϴ�.\n\n");
}