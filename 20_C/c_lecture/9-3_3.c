#include <stdio.h>
#include <string.h>

main()
{
	char voca[100];
	int len = 0, i;
	char tmp;

	printf("input voca = ");
	scanf_s("%s", voca, 100); // scanf_s�� ����ϴ� ���, �Է� ���� "����"�� �޸� ũ�⸦ �ݵ�� ����ؾ���

	len = strlen(voca);
	printf("voca = %s\n", voca);
	printf("string length is = %d \n\n", len);

	for (i = 0; i < len/2; i++) {
		tmp = voca[i];
		voca[i] = voca[len - i - 1];
		voca[len - i - 1] = tmp;
	}
	printf("reverse voca = %s\n\n", voca);
}