#include <stdio.h>
#include <string.h>

main()
{
	char voca[100];
	int len = 0, i;
	char tmp;

	printf("input voca = ");
	scanf_s("%s", voca, 100); // scanf_s를 사용하는 경우, 입력 값이 "문자"면 메모리 크기를 반드시 명시해야함

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